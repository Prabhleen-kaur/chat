import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(  public router:Router) { }

  ngOnInit() {
  }
  public goToSignIn: any =()=>
  {
    this.router.navigate(['/']);
  }
  public chatFunction:any =()=>
  {
    this.router.navigate(['/chat'])
  }
  public groupChatFunction:any =()=>
  {
    this.router.navigate(['/group'])
  }
 
}
