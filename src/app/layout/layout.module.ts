import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
