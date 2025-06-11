import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { Bank } from '../interfaces/bank.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private readonly STORAGE_KEY = 'bankData';

  private bankSubject = new BehaviorSubject<Bank>(this.getStoredBank());
  bank$ = this.bankSubject.asObservable();

  constructor() {
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      const initialBank: Bank = { capital: environment.baseBankCapital };
      this.setStoredBank(initialBank);
    }
  }

  private getStoredBank(): Bank {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : { capital: environment.baseBankCapital };
  }

  private setStoredBank(bank: Bank): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(bank));
    this.bankSubject.next(bank);
  }

  getCapital(): Observable<Bank> {
    return of(this.getStoredBank());
  }

  updateCapital(newCapital: number): Observable<Bank> {
    const updatedBank: Bank = { ...this.getStoredBank(), capital: newCapital };
    this.setStoredBank(updatedBank);
    return of(updatedBank);
  }
}