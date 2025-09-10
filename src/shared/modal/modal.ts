import { Component, EventEmitter, Input, Output, ElementRef, ViewChild, input } from '@angular/core';

declare var bootstrap: any;
@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
  styleUrl: './modal.css'
})
export class Modal {
  @Input() title: string = 'Default Title';
  @Input() description: string = 'default title';
  @Input() type: string = '';
  @Output() closed = new EventEmitter<string>();

  @ViewChild('modal') modalElement!: ElementRef;
  private modalInstance: any;

  open() {
    this.modalInstance = new bootstrap.Modal(this.modalElement.nativeElement);
    this.modalInstance.show();
  }

  hide() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  onClose(action: string) {
    this.closed.emit(action);
    this.hide();
  }
}
