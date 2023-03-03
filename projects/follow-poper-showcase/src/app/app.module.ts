import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FollowPoperModule} from "../../../follow-poper/src/lib/follow-poper.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FollowPoperModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
