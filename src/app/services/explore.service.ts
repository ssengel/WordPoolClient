import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pool } from '../models/pool';
import { User } from '../models/user';
import { Word } from '../models/word';

@Injectable({
  providedIn: 'root'
})
export class ExploreService {

  constructor(private http:HttpClient) { }

  private readonly url = "http://212.125.24.247:8081/explore/";  
  
  getAllPools(){
    return this.http.get<Pool[]>(this.url )
  }

  getUserInfo(userId: String){
    return this.http.get<User>(this.url+ "userInfo/" + userId)
  }

  getWordsByPoolId(poolId: String) {
    return this.http.get<Word[]>(this.url + "pool/" + poolId + "/word")
  }

  getExampleWordsByPoolId(poolId: String){
    return this.http.get<Word[]>(this.url + "pool/" + poolId + "/exampleWords")
  }

  subscribe(poolId: String){
    return this.http.get(this.url + "pool/" + poolId + "/subscribe")
  }

  unSubscribe(poolId: String){
    return this.http.delete(this.url + "pool/" + poolId + "/unSubscribe")
  }

  checkSubscription(poolId: String){
    return this.http.get(this.url + "pool/" + poolId + "/checkSubscription")
  }

  getSubscribedPools(){
    return this.http.get<Pool[]>(this.url + "getSubscribedPools")
  }
  
}
