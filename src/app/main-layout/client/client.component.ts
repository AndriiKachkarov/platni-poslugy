import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ClientService} from '../../services/client.service';
import {Client} from '../../shared/interfaces';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  message: string;

  constructor(
    private  router: Router,
    private  clientService: ClientService,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe((param) => {
      if (param['client']) {

      }
      this.form = new FormGroup({
        name: new FormControl(this.clientService.client ? this.clientService.client.name : null, [Validators.required]),
        EDRPOU: new FormControl((this.clientService.client && this.clientService.client.EDRPOU) ? this.clientService.client.id : null, [],
          this.ExistedClient.bind(this)
        ),
        address: new FormControl((this.clientService.client && this.clientService.client.address) ? this.clientService.client.address : null),
        additions: new FormControl((this.clientService.client && this.clientService.client.additions) ? this.clientService.client.additions : null)
      });
    });

  }
  submit(event){
    console.log('test');
    if ( this.form.invalid) {
      return;
    }
    this.submitted = true;
    if (this.clientService.client && this.clientService.client.id >= 0) {
      const id = this.clientService.client.id;
      this.clientService.client = this.form.value;
      this.clientService.client.id = id;
      this.clientService.patch().subscribe((res) => {
        this.submitted = false;
        this.router.navigate(['/']);
      });
    } else {
      this.clientService.client = this.form.value;
      this.clientService.create().subscribe((res) => {
        this.submitted = false;
        this.router.navigate(['/invoice']);
      });
    }
  }

  return() {
    const url = localStorage.getItem('previousRoute');
    if (url) {
      const urlParts = url.split('?');
      if (urlParts[1]) {
       this.router.navigate([urlParts[0]], {queryParams: {[urlParts[1].split('=')[0]]: urlParts[1].split('=')[1]}});
      } else {
        this.router.navigate([urlParts[0]]);

      }
    } else {
      this.router.navigate(['/']);
    }
  }

  ExistedClient(control: FormControl): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.clientService.getClientByEDRPOU( control.value).subscribe((client: Client) => {
        if (client) {
          resolve({forbiddenEmail: true});
        } else {
          resolve(null);
        }
      });
    });
  }
}
