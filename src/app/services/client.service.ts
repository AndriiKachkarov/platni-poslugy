import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client, Invoice} from '../shared/interfaces';
import {environment} from '../../environments/environment';
import {map, mergeMap, switchMap} from 'rxjs/operators';
import {Data} from '../data/Data';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  client: Client;

  constructor(
    private http: HttpClient
  ) {
  }

  create(): Observable<Client> {
    return this.getClientID().pipe(
      switchMap((id) => {
        this.client.id = id;
        return this.http.patch<Client>(`${environment.fbDbUrl}/clients/${id}.json/`, this.client);
      })
    );

  }

  patch(): Observable<any>{
    return this.http.patch<Invoice>(`${environment.fbDbUrl}/clients/${this.client.id}.json`, this.client);
  }

  getAllClients(){
    return this.http.get<Client[]>(`${environment.fbDbUrl}/clients.json`);
  }

  getClientByEDRPOU(EDRPOU: number): Observable<Client> {
    return this.http.get<Client[]>(`${environment.fbDbUrl}/clients.json`).pipe(
      map((clients: Client[]) => {
        return clients.find((client) => client.EDRPOU === EDRPOU);
      })
    );
  }

  private getClientID() {
    return this.getAllClients().pipe(
      map((clients: Client[]) => {
        return clients.length;
      })
    );
  }

  refreshClient() {
    this.client = undefined;
  }
}
