import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupchatComponent } from './groupchat/groupchat.component';
import{RouterModule,Routes} from '@angular/router';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import{ToastModule} from 'ng6-toastr';
import{BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import { SharedModule } from '../shared/shared.module';
import { ChatpipePipe } from '../shared/chatpipe.pipe';
import {UserDetailsComponent} from '../shared/user-details/user-details.component';

@NgModule({
  imports: [
    CommonModule,
    ToastModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forChild([
      {path:'group', component: GroupchatComponent}]),
      SharedModule
  ],
  declarations: [GroupchatComponent]
})
export class GroupModule { }
