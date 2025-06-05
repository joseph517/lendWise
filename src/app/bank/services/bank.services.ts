import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Bank } from '../interfaces/bank.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BankService {
  private capitalSubject = new BehaviorSubject<number>(
    environment.baseBankCapital
  );
  capital$ = this.capitalSubject.asObservable();

  private apiUrl = 'http://localhost:3000/bank/1';

  constructor(private http: HttpClient) {
    this.updateCapital(environment.baseBankCapital);
  }

  getCapital(): Observable<Bank> {
    return this.http.get<Bank>(this.apiUrl);
  }

  updateCapital(newCapital: number): Observable<Bank> {
    return this.http
      .patch<Bank>(this.apiUrl, { capital: newCapital })
      .pipe(tap((updated) => this.capitalSubject.next(updated.capital)));
  }
}
