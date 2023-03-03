import { NgModule } from '@angular/core';
import { FollowPoperComponent } from './follow-poper.component';
import {FollowPoperDirective} from "./follow-poper.directive";



@NgModule({
  declarations: [
    FollowPoperComponent,
    FollowPoperDirective
  ],
  imports: [
  ],
  exports: [
    FollowPoperComponent,
    FollowPoperDirective
  ]
})
export class FollowPoperModule { }
