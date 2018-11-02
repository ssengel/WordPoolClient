import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PWord } from "src/app/models/p-word";
import { PWordService } from "src/app/services/p-word.service";

@Component({
  selector: "app-pword",
  templateUrl: "./pword.component.html",
  styleUrls: ["./pword.component.css"]
})
export class PWordComponent implements OnInit {
  constructor(
    private pWordService: PWordService,
    private route: ActivatedRoute
  ) {}

  private pWords: PWord[];

  ngOnInit() {
    const poolId = this.route.snapshot.paramMap.get("poolId");
    this.getAllPWords(poolId);
  }

  getAllPWords(poolId: String) {
    this.pWordService.getPWordsByPoolId(poolId).subscribe((pWords: PWord[]) => {
      console.log(pWords);
      this.pWords = pWords;
    });
  }
}
