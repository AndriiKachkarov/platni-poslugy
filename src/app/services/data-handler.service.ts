import { Injectable } from '@angular/core';
import {Category, ServicePack, Service, Subcategory, SubSubcategory} from '../data/interfaces';
// import {Data} from '../data/Data';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataHandlerService {
  totalServices: Service[];
  totalServicePacks: ServicePack[];
  certificationPrise: number;
  timestamps: number[];
  certificationTimestamps: number[];
  certificationPrices: number[];
  categories: Category[];
  subcategories: Subcategory[];
  subSubcategories: SubSubcategory[];

  constructor(private http: HttpClient) {
    // this.setPrices(new Date());
  }

  getTimestamps(): Observable<number[]> {
    if (this.timestamps) {
      return of(this.timestamps);
    } else {
      return this.http.get<number[]>(`${environment.fbDbUrl}/timestamps.json`).pipe(
        map((timestamps) => {
          this.timestamps = timestamps;
          return timestamps;
        })
      );
    }
  }

  getCertificationTimestamps(): Observable<number[]> {
    if (this.certificationTimestamps) {
      return  of(this.certificationTimestamps);
    } else {
      return this.http.get<number[]>(`${environment.fbDbUrl}/certificationTimestamps.json`).pipe(
        map((certificationTimestamps) => {
          this.certificationTimestamps = certificationTimestamps;
          return certificationTimestamps;
        })
      );
    }
  }

  getCategories(): Observable<Category[]> {
    if (this.categories) {
      return of(this.categories);
    } else {
      return this.http.get<Category[]>(`${environment.fbDbUrl}/categories.json`).pipe(
        map((categories) => {
          this.categories = categories;
          return categories;
        })
      );
    }
  }

  getSubcategories(): Observable<Subcategory[]> {
    if (this.subcategories) {
      return of(this.subcategories);
    } else {
      return this.http.get<Subcategory[]>(`${environment.fbDbUrl}/subcategories.json`).pipe(
        map((subcategories) => {
          this.subcategories = subcategories;
          return subcategories;
        })
      );
    }
  }

  getSubSubcategories(): Observable<SubSubcategory[]> {
    if (this.subSubcategories) {
      return of(this.subSubcategories);
    } else {
      return this.http.get<SubSubcategory[]>(`${environment.fbDbUrl}/subSubcategories.json`).pipe(
        map((subSubcategories) => {
          this.subSubcategories = subSubcategories;
          return subSubcategories;
        })
      );
    }
  }

  getTotalServicePacks(): Observable<ServicePack[]> {
    if (this.totalServicePacks) {
      return  of(this.totalServicePacks);
    } else {
      return this.http.get<ServicePack[]>(`${environment.fbDbUrl}/servicePacks.json`).pipe(
        map((totalServicePacks) => {
          this.totalServicePacks = totalServicePacks;
          return totalServicePacks;
        })
      );
    }
  }

  getTotalServices(): Observable<Service[]> {
    if (this.totalServices) {
      return of(this.totalServices);
    } else {
      return this.http.get<Service[]>(`${environment.fbDbUrl}/services.json`).pipe(
        map((services) => {
          this.totalServices = services;
          return services;
        })
      );
    }
  }

  getCertificationPrices(): Observable<number[]> {
    if (this.certificationPrices) {
      return of(this.certificationPrices);
    } else {
      return this.http.get<number[]>(`${environment.fbDbUrl}/certificationPrices.json`).pipe(
        map((certificationPrices) => {
          this.certificationPrices = certificationPrices;
          return certificationPrices;
        }));
    }
  }

  // setPrices(date): void {
  //   date = date ? date.getTime() : date;
  //   this.totalServices = this.findCurrentData(date, Data.services);
  //   this.totalServicePacks = this.findCurrentData(date, Data.servicePacks);
  //   this.certificationPrise = this.findCurrentData(date, Data.certificationPrices);
  // }

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

  getTimestampId(date: Date): any {
    const ts = this.timestamps;
    const certTs = this.certificationTimestamps;
    let timestampId = ts.length - 1;
    let certTimestampId = certTs.length - 1;

    for (let i = 0; i < ts.length; i++) {
      if (date.getTime() < ts[i]) {
        timestampId = i - 1;
        break;
      }
      timestampId = i;
    }

    for (let i = 0; i < certTs.length; i++) {
      if (date.getTime() < certTs[i]) {
        certTimestampId = i - 1;
        break;
      }
      certTimestampId = i;
    }

    return  {timestampId, certTimestampId};
  }

}
