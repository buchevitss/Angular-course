import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownService } from './services/dropdown.service';
import { ErrorMgsComponent } from './error-mgs/error-mgs.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';
import { BaseFormComponent } from './base-form/base-form.component';



@NgModule({
  declarations: [FormDebugComponent, ErrorMgsComponent, InputFieldComponent, BaseFormComponent],
  imports: [
    CommonModule, 
    HttpClientModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,ErrorMgsComponent, InputFieldComponent, BaseFormComponent
  ], providers:[
    DropdownService,
    BaseFormComponent
  ]
})
export class SharedModule { }
