import {Component, EventEmitter, HostBinding, Input, OnInit, Output} from '@angular/core';
import {Category, Service, Subcategory, SubSubcategory} from '../../../data/interfaces';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [fadeStateTrigger]
})
export class TableComponent implements OnInit{

  @Input() categories: Category[];
  @Input() subcategories: Subcategory[];
  @Input() subSubcategories: SubSubcategory[];
  @Input() totalServices: Service[];
  @Input() services: Service[];
  @Output() onAddService = new EventEmitter<Service>();
  @Output() onRemoveService = new EventEmitter<Service>();
  @Input() showAllServices: boolean;

  getServicesByCat(id: number) {
    return this.showAllServices ? this.totalServices.filter((s) => s.category?.id === id) :
      this.totalServices.filter((s) => s.category?.id === id && s.mainPrice);
  }

  getServicesBySubcat(id: number) {
    return this.showAllServices ? this.totalServices.filter((s) => s.subcategory?.id === id) :
      this.totalServices.filter((s) => s.subcategory?.id === id && s.mainPrice);
  }

  getServicesBySubSubcat(id: number) {
    return this.showAllServices ? this.totalServices.filter((s) => s.subSubcategory?.id === id) :
      this.totalServices.filter((s) => s.subSubcategory?.id === id && s.mainPrice);
  }

  hasSubcategory(id: number) {
    return this.subcategories.find((subcategory) => subcategory.category.id === id) ? true : false;
  }

  hasSubSubcategory(id: number) {
    return this.subSubcategories.find((subSubcategory) => subSubcategory.subcategory.id === id) ? true : false;
  }

  countService(service: Service) {
    let count = 0;
    this.services.forEach((cur) => {
      if (cur === service) {
        count++;
      }
    });
    return count;
  }

  addService(service: Service) {
    this.onAddService.emit(service);
  }
  removeService(service: Service) {
    this.onRemoveService.emit(service);
  }

  ngOnInit(): void {
  }
}
