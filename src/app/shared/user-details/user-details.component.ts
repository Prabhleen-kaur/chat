import { Component,OnChanges,Input,EventEmitter,Output, OnInit } from '@angular/core';
import { ToastsManager } from '../../../../node_modules/ng6-toastr';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
@Input() userFirstName:any;
@Input() userLastName:string;
@Input() userStatus:string;
@Input() messageRead : string;
@Input() userColor: string;
@Input() userBg: string;
public firstChar:string;
 
constructor(public toastr: ToastsManager) { }
  ngOnInit():void {
    this.firstChar= this.userFirstName[0];
  }
  public showGroupName = (name: string) => {

    this.toastr.success("You are in group " + name);
  }


}
