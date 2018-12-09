import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { WordService } from 'src/app/services/word.service';
import { FormControl } from '@angular/forms';
import { Word } from 'src/app/models/word';
import {debounceTime, distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { PoolService } from 'src/app/services/pool.service';
import { Pool } from 'src/app/models/pool';
import * as $ from 'jquery'


@Component({
  selector: 'app-search-word',
  templateUrl: './search-word.component.html',
  styleUrls: ['./search-word.component.css']
})
export class SearchWordComponent implements OnInit {

  @ViewChild('searchBox') searchBox: ElementRef;
  mouseState :Boolean = false;
  words :Word[] = [];
  queryField: FormControl = new FormControl();
  pools: Pool[];

  constructor(private wordService: WordService,private poolService: PoolService) { }

  ngOnInit() {
    this.queryField.valueChanges
      .pipe(
        debounceTime(200),
        distinctUntilChanged(),
        tap(userInput =>{
          if(userInput.trim() == ''){ this.words = []}
        }),
        filter(x => x.trim().length > 0),
        switchMap(userInput => this.wordService.search(userInput))
      )
      .subscribe(wordList =>{
        this.words = wordList;
      })

    this.poolService.getPools()
      .subscribe( res =>{
          this.pools = res;
      })
  }

  getPoolDetail(poolId){
      return this.pools.find(x => x._id ===poolId);
  }

  onKeyESC(event) {
    $('#filter').hide();
    this.searchBox.nativeElement.blur()
  }

  onFocus(event){
    if(this.searchBox.nativeElement.value !== ''){
      $('#filter').show();
    }
  }

  onBlur(event){
    if(!this.mouseState){
      $('#filter').hide();
      this.searchBox.nativeElement.blur()
    }
    
  }

  onMouseEnter(event){
    this.mouseState = true;
  }
  onMouseLeave(event){
    this.mouseState = false;
  }

}