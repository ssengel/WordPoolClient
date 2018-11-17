import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { WordService } from "../../services/word.service";
import { Word } from "../../models/word";
import * as Alertify from "alertifyjs";
import { HttpErrorResponse } from "@angular/common/http";
import { async } from "rxjs/internal/scheduler/async";

interface ServerResponse {
  words: Word[];
  totalWords: number;
}

@Component({
  selector: "app-pool",
  templateUrl: "./pool.component.html",
  styleUrls: ["./pool.component.css"]
})
export class PoolComponent implements OnInit {

  private categories = [
    "Health",
    "Electronic",
    "Art",
    "Computer"
  ];
  private err;
  private modal: Word;

  //pagination
  private words: Word[];
  private p: number;
  private total: number;
  private loading: boolean;
  private perPage: number = 15;

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.getPage(1);
  }

  //pagination 
  getPage(page: number) {
    const start = (page - 1) * this.perPage;
    const end = start + this.perPage;
    this.loading = true;
    this.wordService.getWordsFromTo(start, end)
      .subscribe(
          (res: ServerResponse )=>{
              this.total = res.totalWords;
              this.words = res.words;
              this.p = page;
              this.loading = false;
          }
      )
  }

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

    this.wordService.create(word)
      .subscribe((res: Word) => {
        this.words.push(res);
        eng.value = '';
        tr.value = '';
        sentence.value = '';
        Alertify.success("Created new word..");
      },
        ((err: HttpErrorResponse) => {
          Alertify.error(err.error.message)
        })
      );
  }

  delete(id: String) {
    this.wordService.deleteById(id).subscribe(res => {
      const index = this.words.findIndex(word => word._id == id);
      this.words.splice(index, 1);
    })
  }
  setModalContent(word: Word) {
    this.modal = Object.assign({}, word)
  }

  update() {
    this.wordService.update(this.modal).subscribe(
      (res: Word) => {
        const index = this.words.findIndex(x => x._id == res._id);
        this.words[index] = this.modal;
        Alertify.success('Kelime guncellendi.')
      }, (err: HttpErrorResponse) => {
        Alertify.error('Guncelleme Basarisiz.')
      })
  }
}
