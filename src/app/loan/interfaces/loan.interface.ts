export interface Loan {
  id?: number;
  userId: number;
  amount: number;
  approved: boolean;
  paid: boolean;
  paymentDate?: string;
}


export interface LoanWithUser {
  loanId: number;
  userName: string;
  amount: number;
  paid: boolean;
}
