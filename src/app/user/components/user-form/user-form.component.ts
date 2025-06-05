import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { User } from '../../interfaces/user.interface';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent {
  @Input() user: User = {
    name: '',
    email: '',
    dni: '',
  };
  @Output() userFormEvent = new EventEmitter<User>();
  @ViewChild('userForm') userForm!: NgForm;

  onChange() {
    this.userFormEvent.emit(this.user);
  }

  resetForm() {
    this.userForm.reset();
  }
}
