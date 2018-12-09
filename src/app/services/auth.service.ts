import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly url = "http://212.125.24.247:8081/"

  constructor(private router : Router, private http: HttpClient) { }

  login(user: any) {
    return this.http.post<User>(this.url + 'login', user);
  }

  register(user: User){
    return this.http.post<User>(this.url + "register", user);
  }

  isLoggedIn(): boolean {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if(currentUser){
      return true;
    }

    this.router.navigate(['login']);
    return false;
  }
}
