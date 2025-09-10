import { AfterViewInit, Component, ElementRef, ViewChild, Output, EventEmitter, viewChild } from '@angular/core';
import SignaturePad from 'signature_pad';
declare var bootstrap: any;
@Component({
  selector: 'app-signature-pad',
  imports: [],
  templateUrl: './signature-pad.html',
  styleUrl: './signature-pad.css'
})
export class Signature implements AfterViewInit {
  @ViewChild("canvasEl", { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('modal') modalElement!: ElementRef;
  @Output() closed = new EventEmitter<string>();
  sig!: SignaturePad;
  private modalInstance: any;

   ngAfterViewInit() {
      this.resizeCanvas();
        this.sig = new SignaturePad(this.canvas.nativeElement);
    }
  
    resizeCanvas() {
      const canvasEl = this.canvas.nativeElement;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvasEl.width = canvasEl.offsetWidth * ratio;
      canvasEl.height = canvasEl.offsetHeight * ratio;
      canvasEl.getContext("2d")!.scale(ratio, ratio);
    }

     open() {
        this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
        this.modalInstance.show();
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
}
