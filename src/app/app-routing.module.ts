import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'loan',
    loadChildren: () => import('./loan/loan.module').then(m => m.LoanModule)
  },
  {
    path: '',
    redirectTo: 'loan',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'loan'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
