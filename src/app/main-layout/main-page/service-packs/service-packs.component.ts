import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ServicePack, Service} from '../../../data/interfaces';
import {InvoiceService} from '../../../services/invoice.service';

@Component({
  selector: 'app-service-packs',
  templateUrl: './service-packs.component.html',
  styleUrls: ['./service-packs.component.scss'],
})

export class ServicePacksComponent implements OnInit {

  @Input() totalServices: Service[];
  @Input() totalServicePacks: ServicePack[];
  @Input() servicePacks;
  // @Input('servicePacks') set servicePacks(sps) {
  //   this.sps = sps;
  // }
  //
  // get servicePacks() {
  //   return this.sps;
  // }
  @Output() onChange = new EventEmitter<any>();

  private sps: ServicePack[];

  constructor() {
  }

  ngOnInit(): void {
  }

  addSample(sample) {
    const sampleServices = [];
    for (const id of sample.servicesIDs) {
      const service = this.totalServices.find((s) => s.id === id);
      sampleServices.push(service);
    }
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    if (samples) {
      samples.services = samples.services.concat(sampleServices);
    } else {
      this.servicePacks.push({id: sample.id, services: sampleServices});
    }
    this.changeAmount();
  }

  removeSample(sample) {
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    if (samples) {
      for (const id of sample.servicesIDs) {
        const service = samples.services.find((s) => s.id === id);
        if ((service)) {
          samples.services.splice(samples.services.indexOf(service), 1);
        }
      }
      this.changeAmount();
      if (!samples.services.length) {
        this.servicePacks.splice(this.servicePacks.indexOf(samples), 1);
      }
    }
  }

  countSamples(sample) {
    const counters = [];
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    if (samples) {
      for (const id of sample.servicesIDs) {
        let curCounter = 0;
        samples.services.forEach((s) => {
          if (s.id === id) {
            curCounter++;
          }
        });
        counters.push(curCounter);
      }
    }
    return (counters.length === sample.servicesIDs.length) ? Math.min(...counters) : 0;
  }

  getServiceById(id: number): Service {
    return this.totalServices.find((s) => s.id === id);
  }

  addService(service, sample) {
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    if (samples) {
      samples.services.push(service);
    } else {
      this.servicePacks.push({id: sample.id, services: [service]});
    }
    this.changeAmount();
  }

  removeService(service, sample) {
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    if (samples) {
      samples.services.splice(samples.services.indexOf(service), 1);
      this.changeAmount();
    }
  }

  countService(service, sample) {
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    let counter = 0;
    if (samples) {
      samples.services.forEach((s) => {
        if (s === service) {
          counter++;
        }
      });
    }
    return counter;
  }

  changeAmount() {
    this.onChange.emit(this.servicePacks);
  }
}
