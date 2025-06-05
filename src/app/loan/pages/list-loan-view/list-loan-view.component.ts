// list-loan-view.component.ts
import { Component, OnInit } from '@angular/core';
import { Loan } from '../../interfaces/loan.interface';
import { User } from 'src/app/user/interfaces/user.interface';
import { LoanService } from '../../services/loan.services';
import { UserService } from 'src/app/user/services/user.service';
import { BankService } from 'src/app/bank/services/bank.services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { map, switchMap } from 'rxjs';

@Component({
  templateUrl: './list-loan-view.component.html',
  styleUrls: ['./list-loan-view.component.css'],
})
export class ListLoanViewComponent implements OnInit {
  loansWithUsers: { loan: Loan; user: User }[] = [];
  private durationInSeconds = 2;

  constructor(
    private loanService: LoanService,
    private userService: UserService,
    private bankService: BankService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loanService.getPendingLoans().pipe(
      switchMap((loans: Loan[]) => 
        this.userService.getUsers().pipe(
          map((users: User[]) => 
            loans
              .filter((loan) => loan.approved && !loan.paid)
              .map((loan) => ({
                loan,
                user: users.find((u) => u.id === loan.userId)!
              }))
          )
        )
      )
    ).subscribe((loansWithUsers) => {
      this.loansWithUsers = loansWithUsers;
    });
  }

  payLoan(loanId: number) {
    const paidLoan = this.loansWithUsers.find(
      (item) => item.loan.id === loanId
    );
    const paidAmount = paidLoan?.loan.amount ?? 0;

    if (!paidLoan) {
      this.openSnackBar('❌ Préstamo no encontrado', 'Cerrar');
      return;
    }

    this.loanService
      .payLoan(loanId)
      .pipe(
        switchMap(() =>
          this.bankService.getCapital().pipe(
            switchMap((bank) =>
            {
              console.log(bank.capital);
              console.log(paidAmount);

              return this.bankService.updateCapital(bank.capital + paidAmount)
            }
            )
          )
        )
      )
      .subscribe(
        () => {
          this.loansWithUsers = this.loansWithUsers.filter(
            (item) => item.loan.id !== loanId
          );

          this.openSnackBar('✅ Préstamo pagado', 'Cerrar');
        },
        (error) => {
          this.openSnackBar('❌ Error al pagar el préstamo', 'Cerrar');
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: { message, action },
      duration: this.durationInSeconds * 1000,
    });
  }
}
