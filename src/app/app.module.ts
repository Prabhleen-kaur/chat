import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';

import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { ChatsModule } from './chats/chats.module';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { AppService } from './app.service';
import{HttpClientModule} from '@angular/common/http';
import{ToastModule} from 'ng6-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    UserModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    ChatsModule,
    
    RouterModule.forRoot([
      {
      path:'login',component:LoginComponent,pathMatch:'full'},
  {   path:'',redirectTo:'login',pathMatch:'full'},
  {path:'*',component:LoginComponent}
  
    ])
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
