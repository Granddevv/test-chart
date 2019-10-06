import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnalyzeComponent } from "./analyze.component";

const routes: Routes = [
  {path: '', redirectTo: 'combine'},
  {path: ':id', component: AnalyzeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzeRoutingModule { }
