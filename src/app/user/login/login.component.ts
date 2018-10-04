import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {AppService} from './../../app.service'
import { ToastsManager } from '../../../../node_modules/ng6-toastr';
import { ShowHidePasswordModule } from '../../../../node_modules/ngx-show-hide-password';
import{AngularEntypoModule, AngularEntypoComponent} from '../../../../node_modules/angular-entypo'
import{AngularFontAwesomeModule} from '../../../../node_modules/angular-font-awesome'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  
})
export class LoginComponent implements OnInit {
  public email: any;
  public password: any;

  constructor(public appService:AppService,
   public router:Router,public toastr:ToastsManager,
   vcr:ViewContainerRef
   ) {   this.toastr.setRootViewContainerRef(vcr);}

  ngOnInit() {
  }

  public goToSignUp: any = () => {

    this.router.navigate(['/sign-up']);

  } 
  public goToHome: any =()=>
  {
    this.router.navigate(['/home']);
  }

  public signinFunction: any = () => {

    if (!this.email) {
      this.toastr.warning('enter email')


    } else if (!this.password) {

      this.toastr.warning('enter password')


    } else {

      let data = {
        email: this.email,
        password: this.password
      }

      this.appService.signinFunction(data)
        .subscribe((apiResponse) => {

          if (apiResponse.status === 200) {
            console.log(apiResponse)
            Cookie.set('authtoken', apiResponse.data.authToken);
            
            Cookie.set('receiverId', apiResponse.data.userDetails.userId);
           
            Cookie.set('receiverName', apiResponse.data.userDetails.firstName + ' ' + apiResponse.data.userDetails.lastName);
          
            this.appService.setUserInfoInLocalStorage(apiResponse.data.userDetails)
           
         
            
            this.toastr.success('Login success')
            setTimeout(() => {

              this.goToHome();
        
            }, 2000);
    

          } else {

            this.toastr.error(apiResponse.message)
          

          }

        }, (err) => {
          this.toastr.error('some error occured')

        });

    } 

  } 

  

  

}