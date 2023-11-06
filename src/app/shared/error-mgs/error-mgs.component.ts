import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormValidations } from '../services/form-validation';

@Component({
  selector: 'app-error-mgs',
  templateUrl: './error-mgs.component.html',
  styleUrls: ['./error-mgs.component.scss']
})
export class ErrorMgsComponent implements OnInit {

  @Input() control : FormControl;
  @Input() label: string;
  
 
  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage(){
    for(let propertyName in this.control.errors){
      if (this.control.errors.hasOwnProperty(propertyName) &&
        this.control.touched) {
          return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
        }
    }
    return null
  }

}
