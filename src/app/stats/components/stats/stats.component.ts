import { Component, OnInit } from '@angular/core';
import {InvoiceService} from '../../../services/invoice.service';
import {Client, Invoice} from '../../../shared/interfaces';
import {Observable} from 'rxjs';
import {ClientService} from '../../../services/client.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  invoices$: Observable<Invoice[]>;
  clients: Client[];

  constructor(
    private clientService: ClientService,
    private invoiceService: InvoiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe( (clients: Client[]) => {
      this.clients = clients;
      this.invoices$ = this.invoiceService.getAllInvoices();
    });
  }

  goToInvoice(idx: number) {
    this.router.navigate(['invoice'], {queryParams: {idx}});
  }

}
