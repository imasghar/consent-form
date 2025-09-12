import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import SignaturePad from 'signature_pad';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-signature-pad',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './signature-pad.html',
  styleUrls: ['./signature-pad.css']
})
export class Signature implements AfterViewInit {
  @ViewChild('signatureCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  sigPad!: SignaturePad;
  constructor(public activeModal: NgbActiveModal, private sanitizer: DomSanitizer) { }

  ngAfterViewInit() {
    this.resizeCanvas();
    this.sigPad = new SignaturePad(this.canvasRef.nativeElement);
  }

  resizeCanvas() {
    const canvasEl = this.canvasRef.nativeElement;
    const ratio = Math.max(window.devicePixelRatio || 1, 1);
    const parentEl = canvasEl.parentElement;
    if (!parentEl) return;
    const desiredWidth = parentEl.offsetWidth * 0.8;
    const desiredHeight = parentEl.offsetHeight * 0.8;
    canvasEl.width = desiredWidth * ratio;
    canvasEl.height = desiredHeight * ratio;
    canvasEl.style.width = desiredWidth + 'px';
    canvasEl.style.height = desiredHeight + 'px';

    const ctx = canvasEl.getContext('2d');
    if (ctx) {
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    if (this.sigPad) {
      this.sigPad.clear();
    }
  }

  clearSignature() {
    this.sigPad.clear();
  }

  undoSignature() {
    const data = this.sigPad.toData();
    if (data.length) {
      data.pop();
      this.sigPad.fromData(data);
    }
  }

  onSave() {
    let signatureImage: string = this.sigPad.toDataURL();
    let signaturePoints: any[] = this.sigPad.toData();
    if (signaturePoints.length) {
      const safeUrl: SafeUrl = this.sanitizer.bypassSecurityTrustUrl(signatureImage);
      this.activeModal.close(safeUrl);
    }
  }
}
