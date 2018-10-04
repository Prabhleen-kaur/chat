import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng6-toastr';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  public password:string;
  public confirmPassword: string;
  constructor(
    public appService: AppService,
    public _route: ActivatedRoute,
    public router: Router,
    private toastr: ToastsManager,
    vcr:ViewContainerRef
  ) {this.toastr.setRootViewContainerRef(vcr); }
 

  ngOnInit() {
  }
  public userId: string = this._route.snapshot.paramMap.get('userId');
public resetPassword =()=>
{
 
     if(!this.password){
      this.toastr.warning('Please enter pasword')}
      else if(!this.confirmPassword){
        this.toastr.warning('Please enter  password again')}
        else if(this.password!=this.confirmPassword){
this.toastr.warning("Password doesn't match")
        }
        else{
let data ={
userId:this.userId,
password:this.password,
confirmPassword:this.confirmPassword
}
this.appService.resetPassword(data).subscribe((apiResponse)=>
{
  if (apiResponse.status == 200) {
    this.toastr.success("Password reset successfully");
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
