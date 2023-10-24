import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateFormComponent } from './template-form.component';
import { FormsModule } from '@angular/forms';
import { FormDebugComponent } from '../shared/form-debug/form-debug.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TemplateFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule  ]
})
export class TemplateFormModule { }
