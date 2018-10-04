import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { RouterModule, Routes } from '@angular/router';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import{ToastModule} from 'ng6-toastr';
import{BrowserAnimationsModule} from  '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';

import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import{AngularEntypoModule, AngularEntypoComponent} from 'angular-entypo';

import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AngularEntypoModule,
   AngularFontAwesomeModule,
    ToastModule.forRoot(),
    ShowHidePasswordModule.forRoot(),
    RouterModule.forChild([
      {path:'sign-up', component: SignupComponent},
      {path:'forgotPassword',component:ForgotPasswordComponent},
      {path:'resetPassword/:userId',component:ResetPasswordComponent},
      {path:'changePassword',component:ChangePasswordComponent},
      {path:'home',component:HomeComponent}
    ])
  ],
  declarations: [LoginComponent, SignupComponent, HomeComponent, ForgotPasswordComponent, ResetPasswordComponent, ChangePasswordComponent]
})
export class UserModule { }
