import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router:Router) { }

  ngOnInit() {
  }

  login(email: HTMLInputElement, password: HTMLInputElement) {
    const obj = {
      email: email.value,
      password: password.value
    }

    this.authService.login(obj)
      .subscribe((res: any) => {  
        localStorage.setItem('userId', res.user._id);//gerek yok zaten current userda mevcut
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.router.navigate(['']);
      });

    }
}
