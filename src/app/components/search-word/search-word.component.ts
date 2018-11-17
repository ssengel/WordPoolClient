import { Component, OnInit } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { FormControl } from '@angular/forms';
import { Word } from 'src/app/models/word';
import {debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search-word',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.css']
})
export class SearchWordComponent implements OnInit {

  words :Word[] = [];
  queryField: FormControl = new FormControl();

  constructor(private wordService: WordService) { }

  ngOnInit() {
    this.queryField.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
      )
      .subscribe(query =>{
        if(query.trim()){
          this.wordService.search(query)
            .subscribe(
                res => {
                  console.log(res)
                  this.words = res
                }
          )
        }else{
          this.words = [];
        }
      })
  
  }

}