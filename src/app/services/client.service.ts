import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client, Invoice} from '../shared/interfaces';
import {environment} from '../../environments/environment';
import {map, mergeMap, switchMap} from 'rxjs/operators';

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
        return this.http.post<Client>(`${environment.fbDbUrl}/clients.json`, this.client);
      })
    );

  }

  patch(): Observable<any>{
    return this.http.get<Client>(`${environment.fbDbUrl}/clients.json`).pipe(
      mergeMap((res) => {
        const values = Object.values(res);
        const idx = values.indexOf(values.find((c) => +c.id === +this.client.id));
        const name = Object.keys(res)[idx];

        return this.http.patch<Invoice>(`${environment.fbDbUrl}/clients/${name}.json`, this.client);
      })
    );
  }

  getAllClients(){
    return this.http.get<Client[]>(`${environment.fbDbUrl}/clients.json`).pipe(
      map((response) => {
        return response ? Object.values(response) : [];
      })
    );
  }

  getClientByEDRPOU(EDRPOU: number): Observable<Client> {
    return this.http.get<Client>(`${environment.fbDbUrl}/clients.json`).pipe(
      map((response) => {
        return response ? Object.values(response).find((client) => client.EDRPOU === EDRPOU) : response;
      })
    );
  }

  private getClientID() {
    return this.getAllClients().pipe(
      map((clients) => {
        let max = 0;
        for (const client of clients) {
          if (client.id > max) {
            max = client.id;
          }
        }
        return max + 1;
      })
    );
  }
}
