import { Component, OnInit } from "@angular/core";
import { WordService } from "../../services/word.service";
import { Word } from "../../models/word";
import { Router } from "@angular/router";
import * as Alertify from "alertifyjs";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-create-word",
  templateUrl: "./create-word.component.html",
  styleUrls: ["./create-word.component.css"]
})
export class CreateWordComponent implements OnInit {
  private categories = [
    "Health",
    "Electronic",
    "Art",
    "Computer"
  ];

  constructor(private wordService: WordService, private router: Router) {}

  ngOnInit() {}

  create(
    eng: HTMLInputElement,
    tr: HTMLInputElement,
    sentence: HTMLInputElement,
    category: HTMLSelectElement
  ) {
    let word: Word = {
      eng: eng.value,
      tr: tr.value,
      sentence: sentence.value,
      category: category.value
    };

    this.wordService.create(word).subscribe(
      (res: Word) => {
        eng.value = '';
        tr.value = '';
        sentence.value = '';
        Alertify.success("Created new word..");
      },
      ((err: HttpErrorResponse) =>{
        Alertify.error(err.error)
      })
    );
  }
}
