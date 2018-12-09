import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoolService } from 'src/app/services/pool.service';
import { WordService } from 'src/app/services/word.service';
import { Word } from 'src/app/models/word';
import * as $ from "jquery";
import { Pool } from 'src/app/models/pool';

@Component({
  selector: 'app-pool-detail',
  templateUrl: './pool-detail.component.html',
  styleUrls: ['./pool-detail.component.css']
})
export class PoolDetailComponent implements OnInit {

  private poolId: String;
  private pool: Pool;
  private wordList: Word[];

  constructor(private poolService: PoolService, private wordService: WordService, private route: ActivatedRoute, private router:Router) { }

  async ngOnInit() {
    this.poolId = this.route.snapshot.paramMap.get("poolId");
    this.pool = await this.poolService.getPool(this.poolId).toPromise();
    console.log(this.pool)
    this.getWords();
    
  }

  deletePool(){
    this.poolService.deletePool(this.poolId)
      .subscribe(res=>{
          this.router.navigate(['/pools'])
      })
  }

  getWords(){
    console.log("runing getWords")
    this.poolService.getWordsByPoolId(this.poolId)
      .subscribe( wordList => {
          this.wordList = wordList;
          console.log(wordList);
      })
  }

  createWord(eng: HTMLInputElement, tr: HTMLInputElement, sentence: HTMLInputElement) {
    if (!eng.value || !tr.value || !sentence.value) {
      console.log("bos gecilemez ..");
      return;
    }
    const word:Word = {
      poolId: this.poolId,
      eng: eng.value,
      tr: tr.value,
      sentence: sentence.value
    }
    this.wordService.create(word)
      .subscribe(
          createdWord => {
              this.wordList.unshift(createdWord);
          }
      )
  }
  updateWord(oldWord: Word, eng:HTMLInputElement, tr:HTMLInputElement, sentence:HTMLInputElement,){
      let newWord = Object.assign({},oldWord);
      newWord.eng = eng.value;
      newWord.tr = tr.value,
      newWord.sentence = sentence.value
      
      this.wordService.update(newWord)
        .subscribe(
            res =>{
                // const index = this.pWords.findIndex( x => x._id === pWord._id);
                const index = this.wordList.indexOf(oldWord);
                this.wordList[index] = newWord;
                this.cancel(oldWord._id);
            }
        )
  }
  deleteWord(id: String){
      this.wordService.deleteById(id)
        .subscribe(
            res =>{
                const index = this.wordList.findIndex( x => x._id === id);
                this.wordList.splice(index, 1);
            }
        )
  }


  //behavior of detail layout
  edit(wordId: String) {
    //show form
    $(`#${wordId}Content`).slideDown("fast");
    $(`#${wordId}Save`).show();
    $(`#${wordId}Cancel`).show();
    $(`#${wordId}Edit`).hide();
    $(`#${wordId}Delete`).hide();
  }
  cancel(wordId: String) {
    //hide form
    $(`#${wordId}Content`).slideUp("fast");
    $(`#${wordId}Save`).hide();
    $(`#${wordId}Cancel`).hide();
    $(`#${wordId}Edit`).show();
    $(`#${wordId}Delete`).show();
  }

}
