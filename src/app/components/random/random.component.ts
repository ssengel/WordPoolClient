import { Component, OnInit, ElementRef } from '@angular/core';
import { WordService } from '../../services/word.service';
import { Word } from '../../models/word';
import * as $ from 'jquery'
import { Pool } from 'src/app/models/pool';
import { PoolService } from 'src/app/services/pool.service';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  words: Word[];
  pools: Pool[];
  word: Word;
  randomWordsCount: number = 0;
  nextButton: boolean = false;
  initialState: boolean =false;
  state: boolean = false;
  loading: boolean = false;
  wordsOver: boolean = false;
  delay = ms => new Promise(res => setTimeout(res, ms));


  constructor(private wordService: WordService, private poolService: PoolService) { }


  async ngOnInit() {
      this.setSelectPool()
      this.pools = await this.poolService.getPools().toPromise();
  }

  onChangeCategory(category: String){
    const selectPool = document.getElementById('selectPool');
    if(category === "random"){
      $('#selectPool').hide()
    }else{
      $('#selectPool').show()
    }
  }
  setSelectPool(){
    const select = document.getElementById('selectPool')
    let opt = document.createElement('option');
    opt.value = "all";
    opt.text = "All"
    opt.innerHTML = "All";
    select.appendChild(opt);
  }

  getRandomWord<Word>(){

    if(this.words.length != 0){
      const index = Math.floor(Math.random() * this.words.length);
      const word = this.words[index] 
      this.words.splice(index, 1);
      return word;
    }else{
      this.wordsOver = true;
      return null;
    }
  }

  toggle(){
    if(!this.wordsOver){
        if(this.state){
            this.state = false;
        }else{
            this.state = true;
            this.word = this.getRandomWord();
            console.log("yeni kelime" ,this.word.eng);
        }
    }
    
  }

  

  async start(){
    this.loading = true;
    await this.delay(1000);

    if($('#selectMain').val() === "random"){
        const start = this.randomWordsCount * 30;
        this.wordService.getRandomWords(start, start + 30).subscribe(
          res =>{
            console.log(res)
            this.words = res;
            this.randomWordsCount ++;
            this.loading = false;
            this.initialState = true;
            this.wordsOver = false;
            this.state = false;
            this.toggle();
          }
        )

        

    }else{
      const val: String = $('#selectPool').val()
      if(val === "all"){
          //all pools
          this.words = await this.wordService.getAll().toPromise();
          this.loading = false;
          this.initialState = true;
          this.wordsOver = false;
          this.state = false;
          this.toggle();
      }else{
          this.words = await this.poolService.getWordsByPoolId(val).toPromise();
          this.loading = false;
          this.initialState = true;
          this.wordsOver = false;
          this.state = false;
          this.toggle()

      }

    }
  }
}
