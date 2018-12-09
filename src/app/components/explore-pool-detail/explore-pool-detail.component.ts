import { Component, OnInit } from '@angular/core';
import { ExploreService } from 'src/app/services/explore.service';
import { User } from 'src/app/models/user';
import { Pool } from 'src/app/models/pool';
import { Word } from 'src/app/models/word';
import { ActivatedRoute } from '@angular/router';
import { PoolService } from 'src/app/services/pool.service';

@Component({
  selector: 'app-explore-pool-detail',
  templateUrl: './explore-pool-detail.component.html',
  styleUrls: ['./explore-pool-detail.component.css']
})
export class ExplorePoolDetailComponent implements OnInit {

  private user: User;
  private pool: Pool;
  private words: Word[];
  private loading:boolean = false;

  constructor(private exploreService: ExploreService, private route: ActivatedRoute, private poolService: PoolService) { }

  ngOnInit() {
    const poolId = this.route.snapshot.params['poolId'];
    this.getWordsByPoolId(poolId)
    this.getPoolAndUserInfo(poolId);
    

  }

  async getPoolAndUserInfo(poolId: String){
    this.pool = await this.poolService.getPool(poolId).toPromise();
    this.user = await this.exploreService.getUserInfo(this.pool.userId).toPromise();
  }

  getWordsByPoolId(poolId: String){
    this.exploreService.getWordsByPoolId(poolId)
      .subscribe(
        (res: Word[]) => {
            this.words = res;
        } 
      )
  }
  
  copyPool(poolId: String){
    this.loading = true;
    this.exploreService.copyPool(poolId).subscribe(
       res =>{
         this.loading =false;
         console.log(res);
       }
    )
  }
}
