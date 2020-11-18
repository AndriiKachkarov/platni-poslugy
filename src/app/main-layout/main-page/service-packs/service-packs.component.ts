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
  @Output() changeAmount = new EventEmitter<any>();
  @Input() timestampId: any;

  constructor() {
  }

  ngOnInit(): void {
  }

  addSample(sample: ServicePack) {
    const sampleServices = [];
    for (const id of sample.serviceIds) {
      const service = this.totalServices.find((s) => s.id === id);
      sampleServices.push(service);
    }
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    if (samples) {
      samples.services = samples.services.concat(sampleServices);
    } else {
      console.log(sample);
      this.servicePacks.push({id: sample.id, services: sampleServices});
    }
    this.onChangeAmount();
  }

  removeSample(sample: ServicePack) {
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    if (samples) {
      for (const id of sample.serviceIds) {
        const service = samples.services.find((s) => s.id === id);
        if ((service)) {
          samples.services.splice(samples.services.indexOf(service), 1);
        }
      }
      this.onChangeAmount();
      if (!samples.services.length) {
        this.servicePacks.splice(this.servicePacks.indexOf(samples), 1);
      }
    }
  }

  countSamples(currentPack: ServicePack) {
    const counters = [];
    const samples = this.servicePacks.find((s) => s.id === currentPack.id);
    if (samples) {
      for (const id of currentPack.serviceIds) {
        let curCounter = 0;
        samples.services.forEach((s) => {
          if (s.id === id) {
            curCounter++;
          }
        });
        counters.push(curCounter);
      }
    }
    return (counters.length === currentPack.serviceIds.length) ? Math.min(...counters) : 0;
  }

  getServiceById(id: number): Service {
    return this.totalServices[id];
  }

  addService(service, sample) {
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    if (samples) {
      samples.services.push(service);
    } else {
      this.servicePacks.push({id: sample.id, services: [service]});
    }
    this.onChangeAmount();
  }

  removeService(service, sample) {
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    console.log(samples);
    console.log(service);
    if (samples) {
      const index = samples.services.map((s) => s.id).indexOf(service.id);
      if (index > -1) {
        samples.services.splice(index, 1);
      }
    }
    this.onChangeAmount();

  }

  countService(service, sample) {
    const samples = this.servicePacks.find((s) => s.id === sample.id);
    let counter = 0;
    if (samples) {
      samples.services.forEach((s) => {
        if (s.id === service.id) {
          counter++;
        }
      });
    }
    return counter;
  }

  onChangeAmount() {
    console.log(this.servicePacks);
    this.changeAmount.emit(this.servicePacks);
  }

  getServicePackCost(serviceIds) {
    return Math.round(serviceIds.reduce((accum, currentId) => {
      return accum + (this.totalServices[currentId].prices[this.timestampId].mainPrice
        ? this.totalServices[currentId].prices[this.timestampId].mainPrice
        : this.totalServices[currentId].prices[this.timestampId].price);
    }, 0) * 100) / 100;
  }
}
