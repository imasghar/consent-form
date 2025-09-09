import { AfterViewInit, Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
import { FormsModule } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-biopsy-consent',
  imports: [FormsModule],
  templateUrl: './biopsy-consent.html',
  styleUrl: './biopsy-consent.css'
})
export class BiopsyConsent implements OnInit, AfterViewInit {
  @ViewChild("biopsyPatientSignature", { static: true }) canvas!: ElementRef;
  @ViewChild("biopsy", { static: true }) biopsy!: ElementRef;
  sig!: SignaturePad;
  patName = signal("");
  date = signal("");
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

  onSubmit() {
    this.generatePDF();
  }

  generatePDF() {
    const element = this.biopsy.nativeElement;
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('download.pdf');
      });
    }
  }


}
