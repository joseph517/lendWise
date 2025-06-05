import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    UserFormComponent

  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UserFormComponent
  ]
})
export class UserModule { }
