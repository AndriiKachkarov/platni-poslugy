import { Pipe, PipeTransform } from '@angular/core';
import {Client} from '../interfaces';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(clients: Client[], search = ''): Client[] {
    if (search.trim()) {
      return clients.filter((client) => {
        return client.name.toLowerCase().includes(search.toLowerCase());
      });
    }
    return null;
  }
}
