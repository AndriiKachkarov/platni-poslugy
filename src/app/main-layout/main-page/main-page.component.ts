import {ChangeDetectionStrategy, Component, HostBinding, OnInit} from '@angular/core';
import {DataHandlerService} from '../../services/data-handler.service';
import {Router} from '@angular/router';
import {InvoiceService} from '../../services/invoice.service';
import {Category, Service, ServicePack, Subcategory, SubSubcategory} from '../../data/interfaces';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';
import {Invoice} from '../../shared/interfaces';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  animations: [fadeStateTrigger]
})
export class MainPageComponent implements OnInit {

  categories: Category[];
  subcategories: Subcategory[];
  subSubcategories: SubSubcategory[];
  totalServices: Service[];
  totalServicePacks: ServicePack[];
  certificationPrice: number;
  services: Service[];
  servicePacks: Array<any>;
  amount = 0;
  showAllServices = false;
  invoice: Invoice;
  certificationsTimestamps: number[];


  constructor(
    private dataService: DataHandlerService,
    private router: Router,
    private invoiceService: InvoiceService
  ) {
  }


  ngOnInit(): void {
    this.services = this.invoiceService.services;
    this.servicePacks = this.invoiceService.servicePacks;
    this.totalServices = this.dataService.totalServices;
    this.totalServicePacks = this.dataService.totalServicePacks;
    this.certificationPrice = this.dataService.certificationPrise;
    this.certificationsTimestamps = this.dataService.getCertificationsTimestamps();
    this.invoice = this.invoiceService.invoice;
    this.categories = this.dataService.getCategories();
    this.subcategories = this.dataService.getSubcategories();
    this.subSubcategories = this.dataService.getSubSubcategories();
    this.dataService.setPrices(this.invoice.date);
    this.recalculateAmount();
  }

  recalculateAmount() {
    let amount = 0;
    for (const service of this.services) {
      amount += service.mainPrice ? service.mainPrice : service.price;
    }

    for ( const servicePack of this.servicePacks) {
      if (servicePack) {
        for (const service of servicePack.services) {
          amount += service.mainPrice ? service.mainPrice : service.price;
        }
      }
    }

    if (this.invoice.certificationArea) {
    amount += this.invoice.certificationArea * this.certificationPrice;
    }
    this.amount = Math.round(amount * 100) / 100;
    // return amount;
  }

  addService(service: Service) {
    this.services.push(service);
    this.recalculateAmount();
  }

  removeService(service: Service) {
    const index = this.services.indexOf(service);
    if (index > -1) {
      this.services.splice(index, 1);
    }
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
    this.servicePacks = servicePacks;
    this.recalculateAmount();
  }

  createInvoice() {
    this.router.navigate(['invoice']);
  }

  changeDate() {
    this.dataService.setPrices(this.invoice.date);
    this.totalServices = this.dataService.totalServices;
    this.totalServicePacks = this.dataService.totalServicePacks;
    this.certificationPrice = this.dataService.certificationPrise;
    this.recalculateAmount();
  }

  refresh() {
    this.invoiceService.refreshInvoice();
    this.ngOnInit();
    this.changeDate();
  }
}
