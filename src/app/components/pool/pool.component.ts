import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { WordService } from "../../services/word.service";
import { Word } from "../../models/word";
import * as Alertify from "alertifyjs";
import { HttpErrorResponse } from "@angular/common/http";
import { async } from "rxjs/internal/scheduler/async";
import { Pool } from "src/app/models/pool";
import { PoolService } from "src/app/services/pool.service";
import { forkJoin } from "rxjs";

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

  private pools: Pool[];
  private err;
  private modal: Word;
  private selectedPool: String;
  
  //pagination
  private words: Word[];
  private p: number;
  private total: number;
  private perPage: number = 15;

  constructor(private wordService: WordService, private poolService: PoolService) { }

  ngOnInit() {
    
    forkJoin(
      this.poolService.getPools(),
      this.wordService.getWordsFromTo(0,this.perPage)
    )
    .subscribe(([pools, wordInfo]) => {
      this.pools = pools;
      console.log(wordInfo)
      const wInfo:any = wordInfo;
      this.words = wInfo.words;
      this.total = wInfo.totalWords;
      this.p = 0;
    })
    
  }

  getPoolDetail(poolId: String){
      return this.pools.find(x => x._id === poolId);
  }

  //pagination 
  getPage(page: number) {
    const start = (page - 1) * this.perPage;
    const end = start + this.perPage;
    this.wordService.getWordsFromTo(start, end)
      .subscribe(
          (res: ServerResponse )=>{
              this.total = res.totalWords;
              this.words = res.words;
              this.p = page;
          }
      )
  }

  create(
    eng: HTMLInputElement,
    tr: HTMLInputElement,
    sentence: HTMLInputElement,
    poolId: HTMLOptionElement
  ) {

    let word: Word = {
      poolId: poolId.value,
      eng: eng.value,
      tr: tr.value,
      sentence: sentence.value,
    };

    this.wordService.create(word)
      .subscribe((res: Word) => {
        this.words.unshift(res);
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
    this.selectedPool = this.pools.find(x => x._id === word.poolId)._id;
    this.modal = Object.assign({}, word)
  }

  update() {
    this.modal.poolId = this.selectedPool;
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
