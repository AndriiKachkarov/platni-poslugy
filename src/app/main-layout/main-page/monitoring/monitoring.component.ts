import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Data} from '../../../data/Data';
import {HttpClient} from '@angular/common/http';
import {Client, Invoice} from '../../../shared/interfaces';
import {environment} from '../../../../environments/environment';
import {Service, ServicePack} from '../../../data/interfaces';
import {DataHandlerService} from '../../../services/data-handler.service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-monitoring',
  templateUrl: './monitoring.component.html',
  styleUrls: ['./monitoring.component.scss']
})
export class MonitoringComponent implements OnInit {

  monitoringServiceIds = [3, 2, 24, 26, 27, 28, 19, 11, 15, 34, 52, 55, 81, 82, 118, 112, 434, 431];
  @Input() services: Service[];

  @Input() totalServices: Service[];
  @Output() changeAmount = new EventEmitter<any>();
  @Input() timestampId: any;

  constructor() {
  }

  ngOnInit(): void {
    console.log(this.services);
  }

  getServiceById(id: number): Service {
    return this.totalServices[id];
  }

  addService(service) {
    if (this.services) {
      this.services.push(service);
    } else {
      this.services = [service];

    }
    this.onChangeAmount();
  }

  removeService(service) {
    const index = this.services.map((s) => s.id).indexOf(service.id);
    if (index > -1) {
      this.services.splice(index, 1);
    }
    this.onChangeAmount();
  }

  countService(service) {
    if (this.services) {
      let counter = 0;
      this.services.forEach((s) => {
        if (s.id === service.id) {
          counter++;
        }
      });
      return counter;
    } else {
      return 0;
    }

  }

  onChangeAmount() {
    this.changeAmount.emit(this.services);
  }
}
