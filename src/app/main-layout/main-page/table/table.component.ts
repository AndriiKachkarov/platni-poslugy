import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Category, Service, Subcategory, SubSubcategory} from '../../../data/interfaces';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  // animations: [fadeStateTrigger]
})
export class TableComponent implements OnInit{

  @Input() categories: Category[];
  @Input() subcategories: Subcategory[];
  @Input() subSubcategories: SubSubcategory[];
  @Input() totalServices: Service[];
  @Input() services: Service[];
  @Input() timestampId: number;
  @Output() addService = new EventEmitter<Service>();
  @Output() removeService = new EventEmitter<Service>();
  @Input() showAllServices: boolean;

  getServicesByCat(id: number) {
    return this.showAllServices ? this.totalServices.filter((s) => s.categoryId === id) :
      this.totalServices.filter((s) => s.categoryId === id && s.prices[this.timestampId]?.mainPrice);
  }

  getServicesBySubcat(id: number) {
    return this.showAllServices ? this.totalServices.filter((s) => s.subcategoryId === id) :
      this.totalServices.filter((s) => s.subcategoryId === id && s.prices[this.timestampId]?.mainPrice);
  }

  getServicesBySubSubcat(id: number) {
    return this.showAllServices ? this.totalServices.filter((s) => s.subSubcategoryId === id) :
      this.totalServices.filter((s) => s.subSubcategoryId === id && s.prices[this.timestampId]?.mainPrice);
  }

  hasSubcategory(id: number) {
    return this.subcategories.find((subcategory) => subcategory.categoryId === id) ? true : false;
  }

  hasSubSubcategory(id: number) {
    return this.subSubcategories.find((subSubcategory) => subSubcategory.subcategoryId === id) ? true : false;
  }

  countService(service: Service) {
    let count = 0;
    this.services.forEach((cur) => {
      if (cur.id === service.id) {
        count++;
      }
    });
    return count;
  }

  onAddService(service: Service) {
    this.addService.emit(service);
  }
  onRemoveService(service: Service) {
    this.removeService.emit(service);
  }

  ngOnInit(): void {
  }
}
