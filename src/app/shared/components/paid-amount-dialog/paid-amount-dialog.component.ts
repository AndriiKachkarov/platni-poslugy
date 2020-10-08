import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Invoice} from '../../interfaces';

export interface PaidAmountDialogData {
  paidAmount: number;
}

@Component({
  selector: 'app-paid-amount-dialog',
  templateUrl: './paid-amount-dialog.component.html',
})
export class PaidAmountDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<PaidAmountDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaidAmountDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
