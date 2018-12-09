import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-my-profile-link',
  templateUrl: './my-profile-link.component.html',
  styleUrls: ['./my-profile-link.component.css']
})
export class MyProfileLinkComponent implements OnInit {

  private user:User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUserInfo()
      .subscribe(
        (res) => {
          this.user = res;   

      }
    )

    this.userService.currentUser.subscribe(
      res =>{ this.user = res;}
    )
  }


}
