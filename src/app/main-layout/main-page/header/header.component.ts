import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Invoice} from '../../../shared/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() invoice: Invoice;

  @Output() onCollapseAll = new EventEmitter<void>();
  @Output() onToggleFullList = new EventEmitter<void>();
  @Output() onCreateInvoice = new EventEmitter<void>();
  @Output() onChangeDate = new EventEmitter<void>();
  @Output() onRefresh = new EventEmitter<void>();

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  collapseAll() {
    this.onCollapseAll.emit();
  }

  toggleFullList() {
    this.onToggleFullList.emit();
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['login']);
  }

  createInvoice() {
    this.onCreateInvoice.emit();
  }

  changeDate() {
    this.onChangeDate.emit();
  }

  refresh() {
    this.onRefresh.emit();
  }
}
