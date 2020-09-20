import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Invoice} from '../shared/interfaces';
import {environment} from '../../environments/environment';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {ServicePack, Service} from '../data/interfaces';
import {DataHandlerService} from './data-handler.service';
import {log} from 'util';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  services = [];
  servicePacks = [];
  monitoringServices = [];
  invoice: Invoice = {
    date: new  Date(),
    dateOfCreation: new Date(),
    client: undefined,
    // services: [],
    sampleTypes: [],
    serviceIds: {
      services: undefined,
      servicePacks: undefined
    },
    certificationArea: null,
    additionalSum: null
  };
  currentIdx = null;
  invoices: Invoice[];

  constructor(
    private http: HttpClient,
    private dataService: DataHandlerService
  ) {
  }

  create(date: Date): Observable<Invoice> {
    this.setServiceIds();

    return this.http.post<Invoice>(`${environment.fbDbUrl}/${environment.fbDbInvoicesCollection}/${date.getFullYear()}.json`, this.invoice).pipe(
      switchMap((res) => {
        return this.http.get<Invoice>(`${environment.fbDbUrl}/${environment.fbDbInvoicesCollection}/${date.getFullYear()}/${res['name']}.json`);
      })
    );
  }

  getAllInvoices(date: Date): Observable<Invoice[]>{
    // if (this.invoices) {
    //   return of(this.invoices);
    // } else {
      return this.http.get<Invoice[]>(`${environment.fbDbUrl}/${environment.fbDbInvoicesCollection}/${date.getFullYear()}.json`).pipe(
        map((response) => {
          if (response) {
            console.log(response);
            this.invoices = Object.values(response);
            return Object.values(response);
          } else {
            return [];
          }
        })
      );
    // }
  }

  patch(idx: number, date: Date): Observable<any>{
    this.setServiceIds();
    return this.http.get<Invoice>(`${environment.fbDbUrl}/${environment.fbDbInvoicesCollection}/${date.getFullYear()}.json`).pipe(
      mergeMap((res) => {
        const values = Object.values(res);
        const index = values.indexOf(values.find((i) => +i.idx === +idx));
        const name = Object.keys(res)[index];
        return this.http.patch<Invoice>(`${environment.fbDbUrl}/${environment.fbDbInvoicesCollection}/${date.getFullYear()}/${name}.json`, this.invoice);
      })
    );
  }

  private setServiceIds(): void {
    this.invoice.serviceIds.services = this.services.map((s) => s.id);
    this.invoice.monitoringServiceIds = this.monitoringServices.map((s) => s.id);
    this.invoice.serviceIds.servicePacks = this.servicePacks.map((sample) => ({id: sample.id, services: sample.services.map((s) => s.id)}));
  }

  getInvoice(idx: number | undefined, date: Date): Observable<Invoice> {
    if (idx >= 0) {
      console.log(idx);
      return this.http.get<Invoice>(`${environment.fbDbUrl}/${environment.fbDbInvoicesCollection}/${date.getFullYear()}.json`).pipe(
        map((response) => {
          const invoice: Invoice = Object.values(response).find((i) => {
            if (+i.idx === +idx) {
              return true;
            }
          });
          console.log(invoice);
          invoice.date = new Date(invoice.date);
          invoice.dateOfCreation = new Date(invoice.dateOfCreation);

          // this.dataService.setPrices(invoice.date);

          if (invoice.serviceIds){
            if (invoice.serviceIds.services) {
              for (const service of this.dataService.totalServices) {
                for (const id of invoice.serviceIds.services) {
                  if (service.id === +id) {
                      this.services.push(service);
                  }
                }
              }
            }  else {
              invoice.serviceIds.services = [];
            }
            if (invoice.serviceIds.servicePacks) {
              for (const sample of invoice.serviceIds.servicePacks) {
                const services = [];
                if (sample.services) {
                  for (const id of sample.services) {
                    for (const service of this.dataService.totalServices) {
                      if (service.id === +id) {
                        services.push(service);
                      }
                    }
                  }
                }
                this.servicePacks.push({
                  id: sample.id,
                  services
                });
              }
            } else {
              invoice.serviceIds.servicePacks = [];
            }
          } else {
            invoice.serviceIds = {
              services: [],
              servicePacks: []
            };
          }

          if (invoice.monitoringServiceIds) {
            for (const service of this.dataService.totalServices) {
              for (const id of invoice.monitoringServiceIds) {
                if (service.id === +id) {
                  this.monitoringServices.push(service);
                }
              }
            }
          } else {
            this.monitoringServices = [];
          }
          return invoice;
        })
      );
    } else {
      // this.invoice.services = this.services.slice();
      // for (const servicePack of this.servicePacks) {
      //   this.invoice.services = this.invoice.services.concat(servicePack.services);
      // }
      this.setServiceIds();
      return of(this.invoice);
    }
  }

  getInvoiceDate(): Observable<Date> {
    if (this.currentIdx) {
      return this.http.get<Invoice>(`${environment.fbDbUrl}/${environment.fbDbInvoicesCollection}/2020.json`).pipe(
        map((response) => {
          const invoice = Object.values(response).find((i) => {
            if (+i.idx === +this.currentIdx) {
            }
            return +i.idx === +this.currentIdx;
          });
          return  new Date(invoice.date);
        })
      );
    } else {
      return of(this.invoice.date);
    }
  }

  refreshInvoice(): void{
    this.services.length = 0;
    this.servicePacks.length = 0;
    this.monitoringServices.length = 0;
    this.invoice = {
      date: new  Date(),
      dateOfCreation: new Date(),
      client: undefined,
      // services: [],
      sampleTypes: [],
      serviceIds: {
        services: undefined,
        servicePacks: undefined
      },
      certificationArea: null,
      additionalSum: null
    };
    this.currentIdx = null;
  }

}

