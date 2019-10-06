import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from "./layout/layout.component";

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
    { path: '', loadChildren: './page/home/home.module#HomeModule' },
    { path: 'home', loadChildren: './page/home/home.module#HomeModule' },
    { path: 'analyze', loadChildren: './page/analyze/analyze.module#AnalyzeModule' },
  ],
  },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
