import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private error;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  login(email: HTMLInputElement, password: HTMLInputElement) {
    if(!email.value || !password.value){
        this.error = "email, password bos gecilemez;"
        return;
    }
    const obj = {
      email: email.value,
      password: password.value
    }
    this.authService.login(obj)
      .subscribe(
          (res: any) => {
            localStorage.setItem('userId', res.user._id);//gerek yok zaten current userda mevcut
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.router.navigate(['']);  
          },
          err =>{
            this.error = err.error.message;
          }
        );
  }
}
