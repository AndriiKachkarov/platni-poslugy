import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Invoice} from '../../../shared/interfaces';
import {MatSelectChange} from '@angular/material/select';

@Component({
  selector: 'app-certification',
  templateUrl: './certification.component.html',
  styleUrls: ['./certification.component.scss']
})
export class CertificationComponent implements OnInit {
  @Input() invoice: Invoice;
  @Input() certificationPrice: number;
  @Input() certificationsTimestamps;

  @Output() onChangeDate = new EventEmitter<void>();
  @Output() onRecalculateAmount = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    // this.dateChange(this.certificationsTimestamps[0]);
  }

  dateChange(e) {
    this.invoice.date = new Date(e);
    this.onChangeDate.emit();
  }

  recalculateAmount() {
    this.onRecalculateAmount.emit();
  }

  getYear(timestamp): number {
    return new Date(timestamp).getFullYear();
  }

  getInitialTimestamp() {
    const invoiceTimestamp = this.invoice.date.getTime();
    for (const s of this.certificationsTimestamps) {
      if (s === invoiceTimestamp) {
        return s;
      }
    }
    return this.certificationsTimestamps[0];
  }
}
