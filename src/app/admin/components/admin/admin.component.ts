import { Component, OnInit } from '@angular/core';
import {Service} from '../../../data/interfaces';
// import {Data} from '../../../data/Data';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  services: Service[];

  constructor() { }

  ngOnInit(): void {

  }

  onLoadData() {

  }
}
