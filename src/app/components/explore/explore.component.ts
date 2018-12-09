import { Component, OnInit } from '@angular/core';
import { Pool } from 'src/app/models/pool';
import { ExploreService } from 'src/app/services/explore.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  private pools: Pool[];

  constructor(private exploreService: ExploreService) { }

  ngOnInit() {
    this.getPools();
  }

  getPools(){
    this.exploreService.getAllPools()
      .subscribe(
        res => {
          console.log(res) 
          this.pools = res;
        }
      )
  }

}
