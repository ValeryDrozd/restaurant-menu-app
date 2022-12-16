import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss'],
})
export class MenuDialogComponent {
  @Output() dialogClose = new EventEmitter();

  onClose() {
    this.dialogClose.emit();
  }
}
