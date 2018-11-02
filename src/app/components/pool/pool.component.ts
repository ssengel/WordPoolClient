import { Component, OnInit } from "@angular/core";
import { WordService } from "../../services/word.service";
import { Word } from "../../models/word";
import * as Alertify from "alertifyjs";
import { HttpErrorResponse } from "@angular/common/http";

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
  words: Word[];
  modal: Word;
  constructor(private wordService: WordService) {}

  ngOnInit() {
    this.getWords();
  }

  getWords() {
    this.wordService.getAll().subscribe(
      (res: Word[]) => {
        this.words = res;
      },
      (err: HttpErrorResponse) => {
        Alertify.error("Kelimeler Yuklenemdi. \n");
      }
    );
  }

  delete( id: String){
    this.wordService.deleteById(id).subscribe(res =>{
      const index = this.words.findIndex( word => word._id == id);
      this.words.splice(index, 1);
    })
  }
  setModalContent(word: Word){
    this.modal = Object.assign({},word)
  }

  update(){
    this.wordService.update(this.modal).subscribe(
      (res: Word)=>{
        const index = this.words.findIndex(x => x._id == res._id);
        this.words[index] = this.modal; // response atamasinda bir sorun var
        Alertify.success('Kelime guncellendi.')
    },(err: HttpErrorResponse) => {
        Alertify.error('Guncelleme Basarisiz.')
    })
  }
}
