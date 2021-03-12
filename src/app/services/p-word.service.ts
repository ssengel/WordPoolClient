import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PWord } from "../models/p-word";
import * as $ from 'jquery'


@Injectable({
  providedIn: "root"
})
export class PWordService {
  private readonly url = "http://localhost:8080/pool/";

  constructor(private http: HttpClient) {}

  getPWordsByPoolId(poolId: String) {
    return this.http.get<PWord[]>(this.url + poolId + "/pword");
  }

  getPWord(id: String) {
    return this.http.get<PWord>(this.url + id);
  }

  createPWord(poolId: String, pWord: PWord) {
    return this.http.post<PWord>(this.url + poolId + "/pword", pWord);
  }

  deletePWord(poolId: String, pWordId: String){
    return this.http.delete<PWord>(this.url + poolId + "/pword/" + pWordId);
  }

  updatePWord(poolId: String, pWordId:String ,pWord: PWord){
    return this.http.put<PWord>(this.url + poolId + "/pword/" + pWordId, pWord)
  }
  
}
