import { Component, OnInit } from '@angular/core';
import { WordService } from '../../services/word.service';
import { Word } from '../../models/word';

@Component({
  selector: 'app-random',
  templateUrl: './random.component.html',
  styleUrls: ['./random.component.css']
})
export class RandomComponent implements OnInit {

  constructor(private wordService: WordService) { }

  words: Word[];
  word: Word;
  state: boolean = false;
  ngOnInit() {
    this.getWords();
  }

  getWords(){
    this.wordService.getAll().subscribe(
      (res: Word[]) => {
        this.words = res;
        this.toggle();
      }
    )
    
  }
    
  getRandomWord<Word>(){
    const index = Math.floor(Math.random() * this.words.length);
    return this.words[index];
  }

  toggle(){
    console.log('click' + this.state)
    if(this.state){
      this.state = false;
    }else{
      this.state = true;
      this.word = this.getRandomWord();
    }
    
    
  }
}
