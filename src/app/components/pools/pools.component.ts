import { Component, OnInit } from '@angular/core';
import { Pool } from 'src/app/models/pool';
import { PoolsService } from 'src/app/services/pools.service';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {

  pools: Pool[];
  constructor(private poolService: PoolsService) { }

  ngOnInit() {
    this.getAllPools();
  }

  getAllPools(){
      this.poolService.getAllPools()
          .subscribe((pools:Pool[]) => {
              console.log(pools)
              this.pools = pools;
      })
  }

  createPool(poolName: HTMLInputElement){
    const newPool = new Pool();
    newPool.name = poolName.value;

    this.poolService.createPool(newPool)
        .subscribe((res: Pool) =>{
            this.pools.push(res);
        })
  }

}
