import { AfterViewInit, Component, ElementRef, OnInit, signal, viewChild, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { FormsModule } from '@angular/forms';
import { GeneratePdf } from '../../services/generatepdf';
import { Modal } from '../../shared/modal/modal';
interface ValidationObj {
  patName: string;
  patNameDate: string;
  patSignature: any[];
  patSigDate: string;
}


@Component({
  selector: 'app-biopsy-consent',
  imports: [FormsModule, Modal],
  templateUrl: './biopsy-consent.html',
  styleUrl: './biopsy-consent.css'
})

export class BiopsyConsent implements OnInit, AfterViewInit {
  @ViewChild("biopsyPatientSignature", { static: true }) canvas!: ElementRef;
  @ViewChild("biopsy", { static: true }) biopsy!: ElementRef;
  @ViewChild("modalPopup") modalPopup!: Modal;
  sig!: SignaturePad;
  patName = signal("");
  patNameDate = signal("");
  patSigDate = signal("");
  modalDescription = signal("");
  modalTitle = signal("");
  modalType = signal("");

  constructor(private generatePdfService: GeneratePdf) { }
  ngOnInit(): void { }

  ngAfterViewInit() {
    this.resizeCanvas();
    this.sig = new SignaturePad(this.canvas.nativeElement)
  }

  resizeCanvas() {
    const canvasEl = this.canvas.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvasEl.width = canvasEl.offsetWidth * ratio;
    canvasEl.height = canvasEl.offsetHeight * ratio;
    canvasEl.getContext("2d")!.scale(ratio, ratio);
  }

  clearSignature() {
    this.sig.clear();
  }

  undoSignature() {
    const result = this.sig.toData();
    if (result.length) {
      result.pop();
      this.sig.fromData(result)
    }
  }

  ValidateData(data: ValidationObj): boolean | string {
    if (!data.patName || data.patName.trim() === '') {
      return 'Patient name is required';
    }
    if (!data.patNameDate || data.patNameDate.trim() === '') {
      return 'Patient name date is required';
    }
    if (!data.patSignature || data.patSignature.length === 0) {
      return 'Patient signature is required';
    }
    if (!data.patSigDate || data.patSigDate.trim() === '') {
      return 'Patient signature date is required';
    }
    return true;
  }

  onSubmit() {
    const patSignature = signal(this.sig.toData());
    const toValidate: ValidationObj = {
      patName: this.patName(),
      patNameDate: this.patNameDate(),
      patSignature: patSignature(),
      patSigDate: this.patSigDate()
    }
    const result = this.ValidateData(toValidate);
    if (typeof result == 'string') {
      this.modalTitle.set("Validation Error");
      this.modalDescription.set(result);
      this.modalType.set("info");
      this.modalPopup.open()
      return
    }
    this.modalTitle.set("Confirmation");
    this.modalDescription.set("Do you want To upload your data?");
    this.modalType.set("confirmation");
    this.modalPopup.open()
  }

  onModalClosed(result: string) {
    if (result === 'save') {
      const html = this.biopsy.nativeElement;
      if (html) {
        this.generatePdfService.generatePdfFromHtml(html, "tissueBiopsyConsentForm.pdf")
      } else {
        alert('something went wrong!')
      }
    } else if (result === 'cancel') {
      console.log("closed")
    }
  }

}
