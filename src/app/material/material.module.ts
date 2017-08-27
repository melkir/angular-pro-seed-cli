import { NgModule } from '@angular/core';
import { MdInputModule, MdButtonModule } from '@angular/material';

@NgModule({
  imports: [
    MdInputModule,
    MdButtonModule
  ],
  exports: [
    MdInputModule,
    MdButtonModule
  ],
  declarations: []
})
export class MaterialModule { }
