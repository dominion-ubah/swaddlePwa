import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component';
import {SettingsComponent} from './settings/settings.component';
import {DasboardComponent} from './dasboard/dasboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/admin', pathMatch: 'full' },
  { path: 'admin',
    component: AdminComponent,
    children: [
      { path: '', component: DasboardComponent},
      { path: 'settings', component: SettingsComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
