import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Invoice} from '../../../shared/interfaces';

@Component({
  selector: 'app-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss']
})
export class AdditionalComponent implements OnInit {

  @Input() invoice: Invoice;
  @Output() onRecalculateAmount = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  recalculateAmount() {
    this.onRecalculateAmount.emit();
  }
}
