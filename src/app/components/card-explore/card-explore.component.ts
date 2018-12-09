import { Component, OnInit, Input } from '@angular/core';
import { Pool } from 'src/app/models/pool';
import { ExploreService } from 'src/app/services/explore.service';
import { Word } from 'src/app/models/word';

@Component({
  selector: 'app-card-explore',
  templateUrl: './card-explore.component.html',
  styleUrls: ['./card-explore.component.css']
})
export class CardExploreComponent implements OnInit {
  
  @Input() pool: Pool;
  exWords: Word[];

  constructor(private exploreService: ExploreService) { }

  ngOnInit() {
      this.getExWords();
  }

  getExWords(){
      this.exploreService.getExampleWordsByPoolId(this.pool._id)
        .subscribe(
            res => {
              console.log(res)
              this.exWords = res;
            }
        )
  }

}
