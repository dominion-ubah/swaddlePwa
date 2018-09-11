import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from './main.component';
import {HomeComponent} from "./home/home.component";
import {ProductDetailsComponent} from "./product-details/product-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full' },
  { path: 'main',
    component: MainComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'product', component: ProductDetailsComponent }
    ]},

  // { path: "home", loadChildren: "./home/home.module#HomeModule" }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
