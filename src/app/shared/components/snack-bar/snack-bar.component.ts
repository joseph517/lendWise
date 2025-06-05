import { Component, Inject, inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';
import { MaterialModule } from 'src/app/material/material.module';

@Component({
  selector: 'app-snack-bar',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './snack-bar.component.html',
})
export class SnackBarComponent {
  private _snackBar = inject(MatSnackBar);

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { 
    message: string,
    action: string
   }) {}

  close() {
    this._snackBar.dismiss();
  }
}
