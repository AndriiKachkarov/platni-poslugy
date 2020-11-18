import {Component, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Router} from '@angular/router';
import {InvoiceService} from '../../services/invoice.service';
import {Category, Service, ServicePack, Subcategory, SubSubcategory} from '../../data/interfaces';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Invoice, MonitoringServices} from '../../shared/interfaces';
import {mergeMap} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [fadeStateTrigger]
})
export class MainPageComponent implements OnInit, OnDestroy {

  @HostBinding('@fade') a = true;
  categories: Category[];
  subcategories: Subcategory[];
  subSubcategories: SubSubcategory[];
  totalServices: Service[];
  totalServicePacks: ServicePack[];
  timestamps: number[];
  certificationTimestamps: number[];
  certificationPrices: number[];
  timestampId: number;
  certificationPrice: number;
  services: Service[];
  servicePacks: Array<any>;
  showAllServices = false;
  invoice: Invoice;
  isLoaded = false;
  monitoringServices;
  subscription: Subscription;


  constructor(
    private dataService: DataHandlerService,
    private router: Router,
    private invoiceService: InvoiceService,
    private clientService: ClientService
  ) {
  }


  ngOnInit(): void {
    this.services = this.invoiceService.services;
    this.monitoringServices = this.invoiceService.monitoringServices;
    this.servicePacks = this.invoiceService.servicePacks;
    this.invoice = this.invoiceService.invoice;
    this.subscription = this.dataService.getTotalServices().pipe(
      mergeMap((totalServices) => {
        this.totalServices = totalServices;
        return this.dataService.getTimestamps();
      }),
      mergeMap((timestamps) => {
        this.timestamps = timestamps;
        return this.dataService.getCategories();
      }),
      mergeMap((cats) => {
        this.categories = cats;
        return this.dataService.getSubcategories();
      }),
      mergeMap((subCats) => {
        this.subcategories = subCats;
        return this.dataService.getSubSubcategories();
      }),
      mergeMap((subSubCats) => {
        this.subSubcategories = subSubCats;
        return this.dataService.getTotalServicePacks();
      }),
      mergeMap((totalServicePacks) => {
        this.totalServicePacks = totalServicePacks;
        return this.dataService.getCertificationTimestamps();
      }),
      mergeMap((certificationTimestamps) => {
        this.certificationTimestamps = certificationTimestamps;
        this.timestampId = this.dataService.getTimestampId(this.invoice.date).timestampId;
        return this.dataService.getCertificationPrices();
      })
    ).subscribe((certificationPrices) => {
      this.certificationPrices = certificationPrices;
      this.recalculateAmount();
      this.isLoaded = true;
    });
  }

  recalculateAmount() {
    let amount = 0;
    for (const service of this.services) {
      amount += service.prices[this.timestampId].mainPrice ? service.prices[this.timestampId].mainPrice : service.prices[this.timestampId].price;
    }

    for ( const servicePack of this.servicePacks) {
      if (servicePack) {
        for (const service of servicePack.services) {
          amount += service.prices[this.timestampId].mainPrice ? service.prices[this.timestampId].mainPrice : service.prices[this.timestampId].price;
        }
      }
    }

    if (this.invoice.certificationArea) {
      // console.log(this.certificationPrice);
    amount += this.invoice.certificationArea * this.certificationPrices[this.dataService.getTimestampId(this.invoice.date).certTimestampId];
    }

    if (this.monitoringServices) {
      for (const serviceId of Object.keys(this.monitoringServices)) {
        amount += this.totalServices[serviceId].prices[this.timestampId].mainPrice
          ? this.monitoringServices[serviceId] * this.totalServices[serviceId].prices[this.timestampId].mainPrice
          : this.monitoringServices[serviceId] * this.totalServices[serviceId].prices[this.timestampId].price;
      }
    }

    if (this.invoice.additionalSum) {
      amount += this.invoice.additionalSum;
    }
    this.invoice.amount = Math.round(amount * 100) / 100;
  }

  onAddService(service: Service) {
    console.log(this.services === this.invoiceService.services);
    // this.services.push(service);
    console.log(this.services === this.invoiceService.services);
    console.log(this.services);
    console.log(this.invoiceService.services);
    this.recalculateAmount();
  }

  onRemoveService(service: Service) {
    // const index = this.services.map((s) => s.id).indexOf(service.id);
    // if (index > -1) {
    //   this.services.splice(index, 1);
    // }
    this.recalculateAmount();

  }

  collapseAll() {
    for (const cat of this.categories) {
      cat.extended = false;
    }
    for (const cat of this.subcategories) {
      cat.extended = false;
    }
    for (const cat of this.subSubcategories) {
      cat.extended = false;
    }
  }

  toggleFullList() {
    this.showAllServices = !this.showAllServices;
  }

  changeServicePacks(servicePacks: any) {
    // this.servicePacks = servicePacks;
    this.recalculateAmount();
  }

  createInvoice() {
    this.router.navigate(['invoice']);
  }

  changeDate() {
    this.timestampId = this.dataService.getTimestampId(this.invoice.date).timestampId;

    // this.dataService.setPrices(this.invoice.date);
    // this.totalServices = this.dataService.totalServices;
    // this.totalServicePacks = this.dataService.totalServicePacks;
    this.certificationPrice = this.dataService.certificationPrise;
    this.removeNonexistedServices();
    this.recalculateAmount();
  }

  refresh() {
    this.invoiceService.refreshInvoice();
    this.ngOnInit();
    this.changeDate();
    this.clientService.refreshClient();
  }

  removeNonexistedServices(): Service[]{
    const tempServices = [];

    for (const service of this.services) {
      if (service.prices[this.timestampId]) {
        tempServices.push(service);
      }
    }

    this.invoiceService.services = this.services = tempServices;
    return tempServices;
  }

  changeMonitoringServices(monitoringServices: MonitoringServices) {
    this.monitoringServices = monitoringServices;
    this.recalculateAmount();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    // this.isLoaded = false;
  }
}
