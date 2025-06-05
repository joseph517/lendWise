import { Injectable } from "@angular/core";
import { Loan } from "../interfaces/loan.interface";
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';


@Injectable({ providedIn: 'root' })
export class LoanService {
  private apiUrl = 'http://localhost:3000/loans';

  constructor(private http: HttpClient) {}

  createLoan(loan: Loan): Observable<Loan> {
    return this.http.post<Loan>(this.apiUrl, loan);
  }

  getPendingLoans(): Observable<Loan[]> {
    return this.http.get<Loan[]>(`${this.apiUrl}?approved=true&paid=false`);
  }
  
  payLoan(id: number): Observable<Loan> {
    return this.http.patch<Loan>(`${this.apiUrl}/${id}`, { paid: true });
  }
}
