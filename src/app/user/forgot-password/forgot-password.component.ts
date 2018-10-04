import { Component, OnInit , ViewContainerRef} from '@angular/core';
import { ToastsManager } from 'ng6-toastr';
import { AppService } from '../../app.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  public email: string;

  constructor(
    public appService: AppService,
    public _route: ActivatedRoute,
    public router: Router,
    private toastr: ToastsManager,
    vcr:ViewContainerRef
  ) {this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
  }
  public sendResetLink = () => {
    if(!this.email){
      this.toastr.warning('Please enter Email')}
      else{
        let data = {
          email: this.email,
         
        }
  
    this.appService.sendResetLinkFunction(data)
      .subscribe((apiResponse) => {
        if (apiResponse.status == 200) {
          this.toastr.success("Mail Sent SuccessFully");
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        }
        else {
          this.toastr.error(apiResponse.message, "Error!");
        }
      },
        (error) => {
          this.toastr.error("Some Error Occurred", "Error!");
        });

    }  }//end of sendResetLink 
  public goToSignUp() {
    this.router.navigate(['/sign-up']);
  }//end goToSignUp

}
