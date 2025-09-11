import { AfterViewInit, Component, ElementRef, ViewChild, Output, EventEmitter, viewChild, OnInit } from '@angular/core';
import SignaturePad from 'signature_pad';
declare var bootstrap: any;
@Component({
  selector: 'app-signature-pad',
  imports: [],
  templateUrl: './signature-pad.html',
  styleUrl: './signature-pad.css'
})
export class Signature implements AfterViewInit, OnInit {
  @ViewChild('signatureModal') SignatureModalElement!: ElementRef;
  @ViewChild("signatureCanvas") canvasRef!: ElementRef;
  @Output() closed = new EventEmitter<string>();
  sigPad!: SignaturePad;
  private modalInstance: any;

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.sigPad = new SignaturePad(this.canvasRef.nativeElement);
    setTimeout(() => {
      this.resizeCanvas()
    }, 2000)
  }

  open() {
    this.modalInstance = new bootstrap.Modal(this.SignatureModalElement.nativeElement);
    this.modalInstance.show();
  }

  resizeCanvas() {
    if (this.canvasRef && this.canvasRef.nativeElement) {
      const canvasEl = this.canvasRef.nativeElement;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvasEl.width = canvasEl.offsetWidth * ratio;
      canvasEl.height = canvasEl.offsetHeight * ratio;
      canvasEl.getContext("2d")!.scale(ratio, ratio);
    }
  }

  clearSignature() {
    this.sigPad.clear();
  }

  undoSignature() {
    const result = this.sigPad.toData();
    if (result.length) {
      result.pop();
      this.sigPad.fromData(result)
    }
  }
  onSave(){
    if(this.sigPad.toData().length){
    this.closed.emit(this.sigPad.toDataURL());
    this.clearSignature()
    this.modalInstance.hide();
    }
  }
}
