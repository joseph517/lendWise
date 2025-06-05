import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanComponent } from './components/loan/loan.component';
import { MaterialModule } from '../material/material.module';
import { LoanRoutingModule } from './loan-routing.module';
import { InputBetweenRangeComponent } from '../shared/components/input-between-range/input-between-range.component';
import { UserModule } from '../user/user.module';
import { LayoutComponent } from './pages/layout/layout.component';
import { ListLoanViewComponent } from './pages/list-loan-view/list-loan-view.component';
import { LoanTableComponent } from './components/loan-table/loan-table.component';


@NgModule({
  declarations: [
    LoanComponent,
    LayoutComponent,
    ListLoanViewComponent,
    LoanTableComponent
    
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LoanRoutingModule,
    InputBetweenRangeComponent,
    UserModule
  ]
})
export class LoanModule { }
