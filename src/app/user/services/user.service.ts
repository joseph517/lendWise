import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'users';

  constructor() {
    // Inicializar con un array vacío si no hay usuarios guardados
    if (!localStorage.getItem(this.STORAGE_KEY)) {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify([]));
    }
  }

  private getStoredUsers(): User[] {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  private setStoredUsers(users: User[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  createUser(user: User): Observable<User> {
    const users = this.getStoredUsers();
    const newUser = { ...user, id: this.generateUserId(users) };
    users.push(newUser);
    this.setStoredUsers(users);
    return of(newUser);
  }

  getUsers(): Observable<User[]> {
    return of(this.getStoredUsers());
  }

  private generateUserId(users: User[]): number {
    const maxId = users.reduce((max, u) => (u.id && u.id > max ? u.id : max), 0);
    return maxId + 1;
  }
}
