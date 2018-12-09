import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as $ from 'jquery'

@Component({
  selector: 'app-modal-create-word-to-pool',
  templateUrl: './modal-create-word-to-pool.component.html',
  styleUrls: ['./modal-create-word-to-pool.component.css']
})
export class ModalCreateWordToPoolComponent implements OnInit {

  @Input() poolId: String;
  private createForm: FormGroup;
  private submitted: boolean;
  
  constructor(private fb: FormBuilder) {
  }
  
  ngOnInit() {
    this.createForm = this.initForm();
    
  }

  initForm(){
    return this.fb.group({
      eng: ['', Validators.required],
      tr: ['', Validators.required],
      sentence: [''],
    })
  }

  get f() { return this.createForm.controls; }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createForm.invalid) {
        alert("faill")
        return;
    }

    alert('SUCCESS!! :-)')
  }

  showModal(){
    $('#modalCreateWordToPool').modal('show')
  }

  hideModal(){
    $('#modalCreateWordToPool').modal('hide')
  }

}
