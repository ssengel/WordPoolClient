import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PWord } from "src/app/models/p-word";
import { PWordService } from "src/app/services/p-word.service";
import * as $ from "jquery";

@Component({
  selector: "app-pword",
  templateUrl: "./pword.component.html",
  styleUrls: ["./pword.component.css"],
})
export class PWordComponent implements OnInit {
  constructor(
    private pWordService: PWordService,
    private route: ActivatedRoute
  ) { }

  private pWords: PWord[];
  private poolId: String;

  ngOnInit() {
    this.poolId = this.route.snapshot.paramMap.get("poolId");
    this.getAllPWords(this.poolId);

  }
  getAllPWords(poolId: String) {
    this.pWordService.getPWordsByPoolId(poolId).subscribe((pWords: PWord[]) => {
      console.log(pWords);
      this.pWords = pWords;
    });
  }
  createPWord(eng: HTMLInputElement, tr: HTMLInputElement, sentence: HTMLInputElement) {
    if (!eng.value || !tr.value || !sentence.value) {
      console.log("bos gecilemez ..");
      return;
    }
    const pword:PWord = {
      poolId: this.poolId,
      eng: eng.value,
      tr: tr.value,
      sentence: sentence.value
    }
    this.pWordService.createPWord(this.poolId, pword)
      .subscribe(
          res => {
              this.pWords.unshift(res);
          }
      )
  }
  updatePWord(pWord: PWord, eng:HTMLInputElement, tr:HTMLInputElement, sentence:HTMLInputElement,){
      const mPWord:PWord = {
          poolId: pWord.poolId,
          eng: eng.value,
          tr: tr.value,
          sentence: sentence.value
      }
      this.pWordService.updatePWord(pWord.poolId, pWord._id, mPWord)
        .subscribe(
            res =>{
                // const index = this.pWords.findIndex( x => x._id === pWord._id);
                const index = this.pWords.indexOf(pWord);
                this.pWords[index] = res;
                this.cancel(pWord._id);
            }
        )
  }
  deletePWord(id: String){
      this.pWordService.deletePWord(this.poolId, id)
        .subscribe(
            res =>{
                const index = this.pWords.findIndex( x => x._id === id);
                this.pWords.splice(index, 1);
            }
        )
  }


  //behavior of detail layout
  edit(pWordId: String) {
    //show form
    $(`#${pWordId}Content`).slideDown("fast");
    $(`#${pWordId}Save`).show();
    $(`#${pWordId}Cancel`).show();
    $(`#${pWordId}Edit`).hide();
    $(`#${pWordId}Delete`).hide();
  }
  cancel(pWordId: String) {
    //hide form
    $(`#${pWordId}Content`).slideUp("fast");
    $(`#${pWordId}Save`).hide();
    $(`#${pWordId}Cancel`).hide();
    $(`#${pWordId}Edit`).show();
    $(`#${pWordId}Delete`).show();
  }
}
