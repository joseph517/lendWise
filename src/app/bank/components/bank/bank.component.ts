import { Component, OnInit } from '@angular/core';
import { BankService } from '../../services/bank.services';

@Component({
  selector: 'app-bank',
  template: `
    <mat-card>Capital del banco: {{ capital > 0 ? (capital | currency) : (00 | currency) }}</mat-card>
  `,
  styles: [
    `
      mat-card {
        background-color: #f5f5f5;
        box-shadow: none;
      }
    `,
  ],
})
export class BankComponent implements OnInit {
  capital: number = 0;

  constructor(private bankService: BankService) {}

  ngOnInit() {
    this.bankService.bank$.subscribe((bank) => {
      this.capital = bank.capital;
    });
  }
}

