import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MaterialModule } from '../../../material/material.module';

@Component({
  selector: 'app-input-between-range',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './input-between-range.component.html',
  styleUrls: ['./input-between-range.component.css'],
})
export class InputBetweenRangeComponent {
  @Input() loanAmount!: number;
  @Output() loanAmountChange = new EventEmitter<number>();

  onLoanAmountChange(value: number) {
    this.loanAmountChange.emit(value);
  }
}
