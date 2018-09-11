import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MainModule} from './main/main.module';
import {AdminModule} from './admin/admin.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {PicService} from './shared/pic.service';
import {HttpClientModule} from '@angular/common/http';
import { VirtualScrollComponent } from './shared/virtual-scroll/virtual-scroll.component';



@NgModule({
  declarations: [
    AppComponent,
    VirtualScrollComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MainModule,
    AdminModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [PicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
