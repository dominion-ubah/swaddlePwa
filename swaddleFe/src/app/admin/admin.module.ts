import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { SettingsComponent } from './settings/settings.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { MatGridListModule, MatCardModule, MatMenuModule,
  MatIconModule, MatButtonModule, MatToolbarModule,
  MatSidenavModule, MatListModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { NavComponent } from './nav/nav.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
  ],
  declarations: [
    AdminComponent,
    SettingsComponent,
    DasboardComponent,
    NavComponent
  ]
})
export class AdminModule { }
