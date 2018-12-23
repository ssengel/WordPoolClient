import { Component, OnInit } from '@angular/core';
import { Pool } from 'src/app/models/pool';
import { PoolService } from 'src/app/services/pool.service';
import { Observable, merge, forkJoin } from 'rxjs';
import { shareReplay, tap, mergeMap, map, mergeAll, concatAll, concatMap } from 'rxjs/operators';
import { ExploreService } from 'src/app/services/explore.service';


export interface WordCountResponce{
  poolId: String,
  wordCount: number
}

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {

  pools: Pool[];
  poolsObservable:Observable<Pool[]>;
  subscribedPools: Pool[] = [];

  constructor(private poolService: PoolService, private exploreService: ExploreService) { }

  ngOnInit() {
    this.poolsObservable = this.poolService.getPools()
      .pipe(
        tap(()=> console.log("executed http request for Pools")),
        shareReplay()
      );

    this.getAllPools();
    this.getWordCountOfPools();
    this.getSubscribedPools();
  }

  getAllPools(){
      this.poolsObservable
          .subscribe((pools:Pool[]) => {
              this.pools = pools;
      })
  }

  getWordCountOfPools(){
      this.poolsObservable
        .pipe(
            mergeAll(),
            mergeMap((pool:Pool) => this.poolService.getWordsCountByPoolId(pool._id))
        )
        .subscribe((res:WordCountResponce) =>{
          const pool = this.pools.find(x => x._id ===res.poolId);
          pool.wordCount = res.wordCount;
        })
  }

  getSubscribedPools(){
      this.exploreService.getSubscribedPools().subscribe(
        (res) =>{
          this.subscribedPools = res;
        }
      )
  }

  createPool(poolName: HTMLInputElement, poolColor: HTMLInputElement){

    if(!poolName.value.trim()){
       alert("poolname bos gecilemez")
       return;
    }

    const newPool = new Pool();
    newPool.name = poolName.value;
    newPool.color = poolColor.value;

    this.poolService.createPool(newPool)
        .subscribe((res: Pool) =>{
            this.pools.push(res);
        })
  }

}
