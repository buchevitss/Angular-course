import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownService } from './services/dropdown.service';
import { ErrorMgsComponent } from './error-mgs/error-mgs.component';



@NgModule({
  declarations: [FormDebugComponent, ErrorMgsComponent],
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  exports: [
    FormDebugComponent,ErrorMgsComponent
  ], providers:[
    DropdownService
  ]
})
export class SharedModule { }
