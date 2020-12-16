import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTabsModule} from '@angular/material/tabs';
import {HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {SumToStringPipe} from './pipes/sum-to-string.pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {SearchPipe} from './pipes/search.pipe';
import {LoaderComponent} from './components/loader/loader.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSelectModule} from '@angular/material/select';
import {SortPipe} from './pipes/sort.pipe';
import {PaidAmountDialogComponent} from './components/paid-amount-dialog/paid-amount-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {ModalDialogComponent} from './components/modal-dialog/modal-dialog.component';


@NgModule({
  declarations: [
    NotFoundComponent,
    SumToStringPipe,
    SearchPipe,
    LoaderComponent,
    SortPipe,
    SortPipe,
    PaidAmountDialogComponent,
    ModalDialogComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatIconModule,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    NotFoundComponent,
    MatExpansionModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTabsModule,
    MatInputModule,
    SumToStringPipe,
    MatDatepickerModule,
    MatNativeDateModule,
    SearchPipe,
    LoaderComponent,
    MatMenuModule,
    MatSelectModule,
    SortPipe
  ]
})
export class SharedModule {
}
