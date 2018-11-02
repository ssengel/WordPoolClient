import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { PWord } from "../models/p-word";

@Injectable({
  providedIn: "root"
})
export class PWordService {
  private readonly url = "http://212.125.24.247:8080/pool/";

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
}
