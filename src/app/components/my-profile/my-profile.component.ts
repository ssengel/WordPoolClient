import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import * as $ from "jquery"
import { HttpEvent, HttpEventType } from '@angular/common/http';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User;
  selectedFile: File = null;
  status: number = 0;
  btnUploadState: boolean = false;
  loading: boolean = false;
  result: String;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo(){
    this.userService.getUserInfo().subscribe(
      res => { 
        this.user = res;
      }
    )
  }

  onFileChanged(event) {
    console.log(event);
    
    this.selectedFile = event.target.files[0]
    if(this.selectedFile.size>10485760){
        alert("Dosya botuyu 10 Mb dan fazla olmamali")
    }else{
      this.btnUploadState= true;
      this.result = null;
      this.status = 0;
    }

    
  }

  onUpload() {
    const fd = new FormData();
    fd.append('photo', this.selectedFile, this.selectedFile.name);
    this.loading = true;
    this.userService.updateUserImage(fd).subscribe(
        event =>{
          if(event.type === HttpEventType.UploadProgress){
            this.status = Math.round((event.loaded/ event.total) * 100 );
            console.log(status);
          }else if(event.type === HttpEventType.Response) {
            console.log(event);
            this.btnUploadState = false;
            this.loading = false;
            this.user = event.body;
            this.userService.changeUserInfo(event.body)
            this.result = "Basarili"
          }
          
        },
        err =>{
          console.log(err);
          this.result = "Yukleme Basarisizz"
        }
      )
  }

  openModal(){
      this.result = null;
      this.selectedFile = null;
  }
}
