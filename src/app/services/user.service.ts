import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url = "http://localhost:8081/user/";
  
  private userSource = new BehaviorSubject<User>(null);
  currentUser = this.userSource.asObservable();

  constructor(private http: HttpClient) { }

  changeUserInfo(user: User){
    this.userSource.next(user);
  }

  getUserInfo(){
      return this.http.get<User>(this.url + "userInfo/");
  }

  updateUserImage(data: any) {
      return this.http.post<User>(this.url + 'updateImage', data, {
        reportProgress:true,
        observe: 'events'
      });
  }

  
}
