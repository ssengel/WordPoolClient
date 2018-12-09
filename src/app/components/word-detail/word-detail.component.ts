import { Component, OnInit } from '@angular/core';
import { Word } from 'src/app/models/word';
import { WordService } from 'src/app/services/word.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pool } from 'src/app/models/pool';
import { PoolService } from 'src/app/services/pool.service';
import * as $ from 'jquery'


@Component({
  selector: 'app-word-detail',
  templateUrl: './word-detail.component.html',
  styleUrls: ['./word-detail.component.css']
})
export class WordDetailComponent implements OnInit {

  private loading = false;
  private word: Word;
  private tmp: Word;
  private pools: Pool[];
  constructor(private wordService: WordService, private poolService: PoolService, private route: ActivatedRoute, private router:Router) { }

  async ngOnInit() {
    const wordId:String = this.route.snapshot.paramMap.get('wordId');
    this.word = await this.wordService.getById(wordId).toPromise();
    this.tmp = Object.assign({}, this.word); 
    this.pools = await this.poolService.getPools().toPromise();
  }

  edit(){
    $('#detailContent').hide();
    $('#detailForm').show();
  }
  cancel(){
    $('#detailContent').show();
    $('#detailForm').hide();
    this.word = Object.assign({}, this.tmp);
  }
  save(){
    this.loading = true;
    this.wordService.update(this.word).subscribe(
        res =>{
            console.log(this.word);
            this.loading = false;
            this.tmp = Object.assign({}, this.word);
            $('#detailContent').show();
            $('#detailForm').hide();
        }
    )
  }

  delete(){
    this.wordService.deleteById(this.word._id).subscribe(
      res =>{
          this.router.navigate(['/pool']);
      }
    )
  }

}
