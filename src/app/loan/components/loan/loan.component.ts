import { Component, inject, ViewChild } from '@angular/core';
import { LoanService } from '../../services/loan.services';
import { BankService } from 'src/app/bank/services/bank.services';
import { User } from 'src/app/user/interfaces/user.interface';
import { Loan } from '../../interfaces/loan.interface';
import { Bank } from 'src/app/bank/interfaces/bank.interface';
import { UserService } from 'src/app/user/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/components/snack-bar/snack-bar.component';
import { UserFormComponent } from '../../../user/components/user-form/user-form.component';
import { switchMap, tap } from 'rxjs';

@Component({
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css'],
})
export class LoanComponent {
  loanAmount: number = 10000;
  user: User = {
    name: '',
    email: '',
    dni: '',
  };

  @ViewChild(UserFormComponent) userFormComponent!: UserFormComponent;

  private _snackBar = inject(MatSnackBar);
  durationInSeconds = 2;

  openSnackBar(message: string, action: string) {
    this._snackBar.openFromComponent(SnackBarComponent, {
      data: {
        message,
        action,
      },
      duration: this.durationInSeconds * 1000,
    });
  }

  constructor(
    private loanService: LoanService,
    private bankService: BankService,
    private userService: UserService
  ) {}

  applyForLoan() {
    if (!this.user.name || !this.user.email || !this.user.dni) {
      this.openSnackBar('Todos los campos son obligatorios', 'Cerrar');
      return;
    }

    if (this.loanAmount < 10000 || this.loanAmount > 100000) {
      this.openSnackBar('El monto debe estar entre $10,000 y $100,000', 'Cerrar');
      return;
    }

    this.bankService.getCapital().pipe(
      switchMap((bank: Bank) => {
        if (!bank) {
          throw new Error('Error al obtener el capital');
        }

        if (bank.capital < this.loanAmount) {
          throw new Error('Fondos insuficientes');
        }

        if (Math.random() >= 0.5) {
          throw new Error('Préstamo rechazado');
        }

        return this.userService.createUser(this.user).pipe(
          switchMap((createdUser: User) => {
            if (!createdUser) {
              throw new Error('Error al crear el usuario');
            }

            const newLoan: Loan = {
              userId: createdUser.id!,
              amount: this.loanAmount,
              approved: true,
              paid: false,
            };

            return this.loanService.createLoan(newLoan).pipe(
              switchMap(() => {
                const newCapital = bank.capital - this.loanAmount;
                return this.bankService.updateCapital(newCapital).pipe(
                  tap(() => {
                    this.openSnackBar('✅ Préstamo aprobado', 'Cerrar');
                    this.userFormComponent.resetForm();
                    this.loanAmount = 10000;
                  })
                );
              })
            );
          })
        );
      })
    ).subscribe({
      error: (err) => this.openSnackBar(`❌ ${err.message}`, 'Cerrar')
    });
  }
}
