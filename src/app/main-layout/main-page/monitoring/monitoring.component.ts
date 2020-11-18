import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MonitoringServices} from '../../../shared/interfaces';
import {Service} from '../../../data/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatCheckboxChange} from '@angular/material/checkbox';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  monitoringServiceIds = [3, 2, 24, 26, 27, 28, 19, 11, 15, 34, 52, 55, 81, 82, 118, 112,  453, 454, 455, 456, 432, 457, 458, 459];
  form: FormGroup;
  @Input() monitoringServices: MonitoringServices;

  @Input() totalServices: Service[];
  @Output() changeAmount = new EventEmitter<any>();
  @Input() timestampId: any;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.monitoringServices[457] === 0);
    this.form = new FormGroup({
      area: new FormControl(this.monitoringServices[457] === 0 ? null : this.monitoringServices[457] ),
      certs: new FormControl(this.monitoringServices[432] === 0 ? null : this.monitoringServices[432]),
      firms: new FormControl(this.monitoringServices[459] === 0 ? null : this.monitoringServices[459]),
      samples: new FormControl(this.monitoringServices[3] === 0 ? null : this.monitoringServices[3]),
      blendedSamples: new FormControl(this.monitoringServices[24] === 0 ? null : this.monitoringServices[24]),
      radSamples: new FormControl(this.monitoringServices[2] === 0 ? null : this.monitoringServices[2]),
      isCountedMethod: new FormControl(this.monitoringServices[453] === 0 ? false : true)
    });
    console.log(this.form.controls['area']);
  }

  getServiceById(id: number): Service {
    return this.totalServices[id];
  }

  addService(id) {
    this.monitoringServices[id]++;
    this.onChangeAmount();
  }

  removeService(id) {
    if (this.monitoringServices[id] >= 1) {
      this.monitoringServices[id]--;
      console.log(this.monitoringServices[id]);
    }

    this.onChangeAmount();
  }

  countService(service) {
    // if (this.services) {
    //   let counter = 0;
    //   this.services.forEach((s) => {
    //     if (s.id === service.id) {
    //       counter++;
    //     }
    //   });
    //   return counter;
    // } else {
    //   return 0;
    // }
  }

  onChangeAmount() {
    this.changeAmount.emit(this.monitoringServices);
  }

  onFormChange() {
    this.monitoringServices[457] = this.form.controls['area'].value;
    this.monitoringServices[458]
      = this.monitoringServices[432]
      = this.form.controls['certs'].value;
    this.monitoringServices[459] = this.form.controls['firms'].value;
    this.monitoringServices[3]
      = this.monitoringServices[26]
      = this.monitoringServices[11]
      = this.monitoringServices[15]
      = this.form.controls['samples'].value;
    this.monitoringServices[24]
      = this.monitoringServices[27]
      = this.monitoringServices[28]
      = this.monitoringServices[19]
      = this.monitoringServices[34]
      = this.monitoringServices[52]
      = this.monitoringServices[55]
      = this.form.controls['blendedSamples'].value;
    this.monitoringServices[2] = this.form.controls['radSamples'].value;
    if (this.form.controls['isCountedMethod'].value) {
      this.monitoringServices[453]
        = this.monitoringServices[454]
        = this.form.controls['blendedSamples'].value;
      this.monitoringServices[81]
        = this.monitoringServices[82] = 0;

      this.monitoringServices[455]
        = this.monitoringServices[456]
        = this.form.controls['radSamples'].value;
      this.monitoringServices[118]
        = this.monitoringServices[112] = 0;
    } else {
      this.monitoringServices[81]
        = this.monitoringServices[82]
        = this.form.controls['blendedSamples'].value;
      this.monitoringServices[453]
        = this.monitoringServices[454] = 0;

      this.monitoringServices[118]
        = this.monitoringServices[112]
        = this.form.controls['radSamples'].value;
      this.monitoringServices[455]
        = this.monitoringServices[456] = 0;
    }

    this.onChangeAmount();
  }

  getAmount(id: number) {
    return this.monitoringServices[id];
  }

  changeCheckbox(event: MatCheckboxChange) {
    this.form.controls['isCountedMethod'].setValue(event.checked);
    this.onFormChange();
  }
}

