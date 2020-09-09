import { Pipe, PipeTransform } from '@angular/core';
import { orderBy } from 'lodash';
import {Service} from '../../data/interfaces';

@Pipe({ name: 'sort' })
export class SortPipe implements PipeTransform {

  transform(value: Service[], timestamp: number): any[] {
    return  value.sort((a, b) => a.prices[timestamp].id - b.prices[timestamp].id);
  }
}
