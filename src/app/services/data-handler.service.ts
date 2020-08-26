import { Injectable } from '@angular/core';
import {Category, ServicePack, Service, Subcategory, SubSubcategory} from '../data/interfaces';
import {Data} from '../data/Data';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  totalServices: Service[];
  totalServicePacks: ServicePack[];
  certificationPrise: number;

  constructor() {
    this.setPrices(new Date());
  }

  getCategories(): Category[] {
    return Data.categories;
  }

  getSubcategories(): Subcategory[] {
    return Data.subcategories;
  }

  getSubSubcategories(): SubSubcategory[] {
    return Data.subSubcategories;
  }

  getTotalServicePacks(): ServicePack[] {
    return this.totalServicePacks;
  }

  getCertificationsTimestamps(): number[] {
    return Object.keys(Data.certificationPrices).map((key) => +key);
  }

  setPrices(date): void {
    date = date ? date.getTime() : date;

    this.totalServices = this.findCurrentData(date, Data.services);
    this.totalServicePacks = this.findCurrentData(date, Data.servicePacks);
    console.log(this.totalServicePacks);
    this.certificationPrise = this.findCurrentData(date, Data.certificationPrices);
    // return this.findCurrentData(date, Data.services);

    // const keys = Object.keys(Data.services).sort((a, b) => +a - +b);
    // let dateKey = +keys[keys.length - 1];
    // for (const key of keys) {
    //   if (date < key) {
    //     this.totalServices = Data.services[dateKey];
    //     return  Data.services[dateKey];
    //   }
    //   dateKey = +key;
    // }
    // this.totalServices = Data.services[dateKey];
  }

  private findCurrentData(date, data): any {
    const keys = Object.keys(data).sort((a, b) => +a - +b);
    let dateKey = +keys[keys.length - 1];
    for (const key of keys) {
      if (date < key) {
        return  data[dateKey];
      }
      dateKey = +key;
    }
    return  data[dateKey];
  }
}
