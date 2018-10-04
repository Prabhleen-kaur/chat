import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng6-toastr';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public email: string;
  public password:string;
  public newPassword:string;
  public confirmPassword: string;
  constructor( public appService: AppService,
    public _route: ActivatedRoute,
    public router: Router,
    private toastr: ToastsManager,
    vcr:ViewContainerRef) { this.toastr.setRootViewContainerRef(vcr);}

  ngOnInit() {

  }
 
  public changePassword =()=>
  {
    if(!this.email){
      this.toastr.warning('Please enter email address')}
       if(!this.password){
        this.toastr.warning('Please enter pasword')}
        if(!this.newPassword){
          this.toastr.warning('Please enter new pasword')}
        else if(!this.confirmPassword){
          this.toastr.warning('Please enter  password again')}
          else if(this.newPassword!=this.confirmPassword){
  this.toastr.warning("Password doesn't match")
          }
          else{
  let data ={
  email:this.email,
  password:this.password,
  newPassword:this.newPassword,
  confirmPassword:this.confirmPassword
  }
  this.appService.changePassword(data).subscribe((apiResponse)=>
  {
    if (apiResponse.status == 200) {
      this.toastr.success("Password changed successfully");
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    }
    else {
      this.toastr.error(apiResponse.message, "Error!");
    }},
    (error) => {
      this.toastr.error("Some Error Occurred", "Error!");
    
  })
  
          }
  }
  public goToSignUp() {
    this.router.navigate(['/sign-up']);
  }
  }
  
