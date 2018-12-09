import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { WordService } from 'src/app/services/word.service';
import { PoolService } from 'src/app/services/pool.service';
import { Pool } from 'src/app/models/pool';
import { Word } from 'src/app/models/word';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error;
  success;
  delay = ms => new Promise(res => setTimeout(res, ms));

  constructor(private authService: AuthService, private router: Router, private wordService: WordService, private poolService: PoolService) { }

  ngOnInit() {
  }

  register(username: HTMLInputElement, email: HTMLInputElement, password: HTMLInputElement) {
    const user: User = ({
      username: username.value,
      email: email.value,
      password: password.value
    })

    this.authService.register(user)
      .subscribe(
        user => {
          this.success = "Successful ..";
          this.error = null;
          this.redirect(1000);
        }
      )
  }

  async redirect(ms: Number) {
    await this.delay(ms)
    this.router.navigate(['/login']);
  }

}
