import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Word } from "../models/word";
import { ErrorHandlerService } from "./error-handler.service";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class WordService {

  private readonly url = "http://212.125.24.247:8080/word/";

  constructor(private http: HttpClient, private err: ErrorHandlerService) { }

  getAll() {
    return this.http
      .get<Word[]>(this.url);
  }

  getWordsFromTo(from: Number, to: Number) {
    return this.http.get(this.url + `from/${from}/to/${to}`);
  }

  getById(id: String) {
    return this.http
      .get<Word>(this.url + id);
  }

  create(word: Word) {
    return this.http
      .post(this.url, word);
  }

  deleteById(id: String) {
    return this.http
      .delete(this.url + id);
  }
  update(word: Word) {
    return this.http
      .put<Word>(this.url + word._id, word);
  }

  search(query: string) {
    return this.http.get<Word[]>(this.url + "search/" + query);
  }
}
