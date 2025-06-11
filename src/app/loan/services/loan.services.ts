import { Injectable } from "@angular/core";
import { Loan } from "../interfaces/loan.interface";
import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class LoanService {
  private readonly STORAGE_KEY = 'loans';

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  private getStoredLoans(): Loan[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private setStoredLoans(loans: Loan[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(loans));
  }

  private generateLoanId(loans: Loan[]): number {
    const maxId = loans.reduce((max, loan) => (loan.id && loan.id > max ? loan.id : max), 0);
    return maxId + 1;
  }

  createLoan(loan: Loan): Observable<Loan> {
    const loans = this.getStoredLoans();
    const newLoan: Loan = {
      ...loan,
      id: this.generateLoanId(loans),
      approved: loan.approved ?? false,
      paid: loan.paid ?? false,
    };
    loans.push(newLoan);
    this.setStoredLoans(loans);
    return of(newLoan);
  }

  getPendingLoans(): Observable<Loan[]> {
    const loans = this.getStoredLoans();
    const pending = loans.filter((loan) => loan.approved === true && loan.paid === false);
    return of(pending);
  }

  payLoan(id: number): Observable<Loan> {
    const loans = this.getStoredLoans();
    const index = loans.findIndex((loan) => loan.id === id);
    if (index !== -1) {
      loans[index].paid = true;
      this.setStoredLoans(loans);
      return of(loans[index]);
    } else {
      throw new Error(`Loan with id ${id} not found`);
    }
  }
}