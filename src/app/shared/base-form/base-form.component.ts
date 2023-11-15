import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-base-form',
  template: '<div></div>'
})
export  abstract class BaseFormComponent implements OnInit {

  formulario: FormGroup

  constructor() { }

  ngOnInit(): void {
  }

  abstract submit();
  
  onSubmit(){
    if(this.formulario.valid){
      this.onSubmit();
    }
  }

}
