import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankComponent } from './components/bank/bank.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    BankComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    BankComponent
  ] 
})
export class BankModule { }
