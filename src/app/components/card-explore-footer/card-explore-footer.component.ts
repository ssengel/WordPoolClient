import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { ExploreService } from 'src/app/services/explore.service';
import { PoolService } from 'src/app/services/pool.service';

@Component({
  selector: 'app-card-explore-footer',
  templateUrl: './card-explore-footer.component.html',
  styleUrls: ['./card-explore-footer.component.css']
})
export class CardExploreFooterComponent implements OnInit {

  @Input() userId: String;
  @Input() poolId: String;

  private user: User;
  private wordCount: Number;

  constructor(private exploreService: ExploreService, private poolService: PoolService) { }

  ngOnInit() {
    this.getUserInfo();
    this.getWordCount();
  }

  getUserInfo(){
    this.exploreService.getUserInfo(this.userId)
      .subscribe(
        res =>{
          console.log(res);
          this.user = res;
        }
      )
  }

  getWordCount(){
    this.poolService.getWordsCountByPoolId(this.poolId)
      .subscribe(
        (res:any) => {
          console.log(res)
          this.wordCount = res.wordCount;
        }
      )
  }

}
