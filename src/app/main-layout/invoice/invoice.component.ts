import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import printJS from 'print-js';
import {ActivatedRoute, Router} from '@angular/router';
import {InvoiceService} from '../../services/invoice.service';
import {Client, Invoice} from '../../shared/interfaces';
import {Observable, of, Subscription} from 'rxjs';
import {map, switchMap} from 'rxjs/operators';
import {ClientService} from '../../services/client.service';
import {DataHandlerService} from '../../services/data-handler.service';
import {Service} from '../../data/interfaces';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss', '../../../assets/print.css'],
  animations: [fadeStateTrigger]
})
export class InvoiceComponent implements OnInit, OnDestroy {
  @HostBinding('@fade') a = true;

  months = [
    'січня',
    'березня',
    'квітня',
    'травня',
    'червня',
    'липня',
    'серпня',
    'вересня',
    'жовтня',
    'листопада',
    'грудня'
  ];
  invoice: Invoice;
  invoiceIdx$: Observable<number>;
  clients: Client[];
  clientName: any = '';
  clientNameFocused = false;
  // currentIdx: number;
  private querySubscription: Subscription;
  services: Service[];

  constructor(
    private router: Router,
    private invoiceService: InvoiceService,
    private clientService: ClientService,
    private route: ActivatedRoute,
    private dataService: DataHandlerService
  ) {
    this.services = dataService.totalServices;
  }

  ngOnInit(): void {
    this.querySubscription = this.route.queryParams.pipe(
      switchMap((queryParam) => {
        this.invoiceService.currentIdx = queryParam.idx;
        return this.invoiceService.getInvoiceDate();
      }),
      switchMap((date) => {
        this.dataService.setPrices(date);
        return this.invoiceService.getInvoice(this.invoiceService.currentIdx);
      }),
      switchMap((invoice) => {
        this.invoice = this.invoiceService.invoice = invoice;
        return this.clientService.getAllClients();
      })
    ).subscribe((clients: Client[]) => {
      if (this.invoice.idx) {
        if (!this.invoiceService.currentIdx) {
          console.log('!');
          this.invoice.sampleTypes[0].amount = this.numToLocale(this.countTotalAmount());
          this.invoice.sampleTypes[1] = {name: '', unit: '', count: '', amount: ''};
          this.invoice.sampleTypes[2] = {name: '', unit: '', count: '', amount: ''};
        }

      } else {
        console.log(this.invoice);
        if (this.invoice.certificationArea) {
          this.invoice.sampleTypes = [
            {name: `Матеріали агрохімічного обстеження с/г угідь згідно договору №00-01-33-___ від __.__.____р.`, unit: 'га', count: `${this.invoice.certificationArea}`, amount: this.numToLocale(this.countTotalAmount())},
            {name: '', unit: '', count: '', amount: ''},
            {name: '', unit: '', count: '', amount: ''}
          ];
        } else {
          this.invoice.sampleTypes = [
            {name: '', unit: 'зр.', count: '1', amount: this.numToLocale(this.countTotalAmount())},
            {name: '', unit: '', count: '', amount: ''},
            {name: '', unit: '', count: '', amount: ''}
          ];
        }
        if (this.clientService.client) {
          this.clientName = this.clientService.client.name;
          this.invoice.client = this.clientService.client.id ?
            this.clientService.client.id :
            this.clientService.client.name;
        }
      }
      this.clients = clients;
      const client = clients.find((c) => c.id === this.invoiceService.invoice.client);
      this.clientService.client = clients.find((c) => c.id === this.invoiceService.invoice.client);
      this.clientName = client ? client.name : this.invoiceService.invoice.client;
      this.getInvoiceIdx(this.invoice.idx);
    });
  }

  print(type: string) {
    switch (type) {
      case 'all':
        printJS({printable: 'toPrint', type: 'html', css: ['./assets/print.css', './assets/hide-button.css'], scanStyles: true});
        break;

      case 'data':
        printJS({printable: 'toPrint', type: 'html', css: ['./assets/print.css', './assets/hide-button.css', './assets/hide-form.css'], scanStyles: true});
        break;

      case 'form':
        printJS({printable: 'toPrint', type: 'html', css: ['./assets/print.css', './assets/hide-button.css', './assets/hide-data.css'], scanStyles: true});
        break;



    }

  }

  create() {
    if (!this.clientService.client) {
      this.invoiceService.invoice.client = this.clientName;
    }
    if (!this.invoiceService.invoice.idx) {
      this.invoiceIdx$.pipe(
        switchMap((idx) => {
          this.invoiceService.invoice.idx = idx;
          return this.invoiceService.create();
        })
      ).subscribe((res) => {
        this.getInvoiceIdx(res.idx);
      });
    } else {
      this.invoiceService.patch(this.invoiceService.invoice.idx).subscribe((res) => {
      });
    }

  }

  toNum(str: string): number {
    return +str.split(',').join('.');
  }

  getInvoiceIdx(idx: number = null) {
    if (idx) {
      this.invoiceIdx$ = of(idx);
    } else {
      this.invoiceIdx$ = this.invoiceService.getAllInvoices().pipe(
        map((res) => {
            let max = 0;
            for (const inv of res) {
              if (inv.idx && inv.idx > max) {
                max = inv.idx;
              }
            }
            return max + 1;
          }
        )
      );
    }
  }

  countTotalAmount() {
    let totalAmount = 0;
    if (this.invoice.services) {
      totalAmount += this.invoice.services.reduce((acc, s) => {
        return s.mainPrice ? s.mainPrice + acc : s.price + acc;
      }, 0);
    }

    if (this.invoice.certificationArea) {
      console.log(this.dataService.certificationPrise);
      totalAmount += this.invoice.certificationArea * this.dataService.certificationPrise;
    }
    return Math.round(totalAmount * 100) / 100;
  }

  // countTotalAmount() {
  //     let totalAmount = this.invoiceService.services.reduce((acc, s) => {
  //       return s.mainPrice ? s.mainPrice + acc : s.price + acc;
  //     }, 0);
  //     for (const sample of this.invoiceService.servicePacks) {
  //       totalAmount += sample.services.reduce((acc, s) => {
  //         return s.mainPrice ? s.mainPrice + acc : s.price + acc;
  //       }, 0);
  //     }
  //     return Math.round(totalAmount * 100) / 100;
  // }

  countPDV() {
    return this.countTotalAmount() / 6;
  }

  return() {
    this.router.navigate(['/']);
  }

  localeToNum(locale: string): number {
    return +locale.split(' ').join('').split(',').join('.');
  }

  numToLocale(num: number | string): string {
    if (typeof num === 'number') {
      num = num.toString();
    }
    num = num.split('.').join(',');
    const numArr = num.split(',');
    let intStr = '';
    let counter = 0;
    for (let  i = numArr[0].length; i > 0; i--) {
      intStr = numArr[0][i - 1] + intStr;
      if (counter === 2) {
        intStr = ' ' + intStr;
        counter = 0;
      } else {
        counter++;
      }
    }
    return numArr[1] ?
      numArr[1].length === 1 ?
        intStr + ',' + numArr[1] + '0' :
        intStr + ',' + numArr[1] :
      intStr + ',00';
  }

  getDay() {
    return this.invoice.dateOfCreation.getDate();
  }

  getMonth() {
    return this.months[this.invoice.dateOfCreation.getMonth() - 1];
  }

  addClient() {
    this.clientService.client = null;
    this.router.navigate(['client']);
  }

  selectClient(client: Client) {
    this.clientService.client = client;
    this.clientName = client.name;
    this.invoice.client = client.id ? client.id : client.name;
  }

  ngOnDestroy(): void {
    this.querySubscription.unsubscribe();
  }
}
