// loan-table.component.ts
import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges, inject } from '@angular/core';
import { Loan } from '../../interfaces/loan.interface';
import { User } from 'src/app/user/interfaces/user.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';

@Component({
  selector: 'app-loan-table',
  templateUrl: './loan-table.component.html',
  styleUrls: ['./loan-table.component.css'],
})
export class LoanTableComponent implements OnChanges {
  @Input() loansWithUsers: { loan: Loan; user: User }[] = [];
  @Output() payLoanClicked = new EventEmitter<number>();

  displayedColumns: string[] = ['name', 'amount', 'action'];
  dataSource: { loan: Loan; user: User }[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loansWithUsers']) {
      this.dataSource = this.loansWithUsers;
    }
  }

  onPayLoan(loanId: number) {
    this.payLoanClicked.emit(loanId);
  }
}
