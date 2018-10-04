import { Component, OnInit,  ViewContainerRef, ViewChild, ElementRef  } from '@angular/core';
import { SocketService } from './../../socket.service';
import{AppService} from './../../app.service';
import {Router} from '@angular/router';
import{Cookie} from 'ng2-cookies/ng2-cookies';
import { ToastsManager } from '../../../../node_modules/ng6-toastr';
declare var $: any;

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.component.html',
  styleUrls: ['./groupchat.component.css'],
  providers:[SocketService]
})
export class GroupchatComponent implements OnInit {
  
  
  public scrollMe: ElementRef;
public roomName:any;
public groupMember: boolean;
public NewRoomName:any;
public roomDetails:any=[];
  public authToken: any;
  public roomInfo :any;
  public userInfo: any;
  public receiverId: any;
  public receiverName: any;
  public userList: any = [];
  public disconnectedSocket: boolean;
  public messageText: any; 
  public messageList:any=[];
  public roomList:any=[];
  public scrollToChatTop:boolean;
  public pageValue: number = 0;
  public loadingPreviousChat: boolean = false;

  constructor(public AppService: AppService,
    public SocketService: SocketService,
    public router: Router,
    private toastr: ToastsManager,
    vcr: ViewContainerRef) {
       this.toastr.setRootViewContainerRef(vcr);
      this.receiverId = Cookie.get('receiverId');

    this.receiverName = Cookie.get('receiverName');
    }
  
  ngOnInit() {
    this.authToken = Cookie.get('authtoken');
    this.roomInfo = this.AppService.getRoomInfoFromLocalStorage();
   
    this.userInfo = this.AppService.getUserInfoFromLocalStorage();
    this.checkStatus();
    this.verifyUserConfirmation();
  this.getOnlineUserList();
  this.getAllRoomsFunction();
  $('#create').click(function() {
    location.reload();
});
$('#edit').click(function() {
  location.reload();
});
$('#delete').click(function() {
  location.reload();
});
  }
   
  public checkStatus:any=()=>{
    if(Cookie.get('authToken')===undefined||Cookie.get('authToken')==='')
    {
      this.router.navigate(['/']);
      return false;
    
    }
    else{
      return true;
    }
      }
      public verifyUserConfirmation: any = () => {

        this.SocketService.verifyUser()
          .subscribe((data) => {
    
            this.disconnectedSocket = false;
    
            this.SocketService.setUser(this.authToken);
            this.getOnlineUserList()
    
          });
        }
        public getOnlineUserList :any =()=>{

          this.SocketService.onlineUserList()
            .subscribe((userList) => {
      
              this.userList = [];
      
              for (let x in userList) {
      
                let temp = { 'userId': x, 'name': userList[x], 'unread': 0, 'chatting': false };
      
                this.userList.push(temp);          
      
              }
              
              console.log(this.userList);
      
            });
          }
          public getAllRoomsFunction: any = () => {
            this.AppService.getAllRooms().subscribe((apiResponse) => {
              if(apiResponse.status === 200) {
                   for(let x of apiResponse.data)
                   {
                       this.roomDetails.push(x);         
                   }
               


for(let y in this.roomDetails){
                    
                    let roomTemp = {'roomId': this.roomDetails[y].roomId, 'name': this.roomDetails[y].roomName,  'unread': 0, 'chatting': false}
                    this.roomList.push(roomTemp); 
                  }
                  console.log(this.roomList);
              }
              
              else{
                this.toastr.error(apiResponse.message)
              }
            }, (err) => {
              this.toastr.error("Some error occured")
            });
          }
        
  public CreateRoom: any = () => {
    if(!this.roomName){
      this.toastr.warning('Please enter Group Name');
    }else
    {
      let data = {
        userId:this.receiverId,
        roomName: this.roomName
      }
      console.log(data)
    this.AppService.createRoom(data).subscribe((apiResponse) => {
      console.log(apiResponse);
  
      if(apiResponse.status === 200) {
        this.toastr.success('Group Created Successfully.');
       
      } else {
        this.toastr.error(apiResponse.message);
      }
    }, (err) => {
      this.toastr.error('Some error occured');
    })
    }
  }
  public EditRoom: any = () => {
    if(!this.roomName){
      this.toastr.warning('Please enter Group Name');
    }else if(!this.NewRoomName){
      this.toastr.warning('Please enter  New Group Name');
    }
    
    else
    {
      let data = {
        
        roomName: this.roomName,
        NewRoomName : this.NewRoomName
      }
      console.log(data)
    this.AppService.editRoom(data).subscribe((apiResponse) => {
      console.log(apiResponse);
  
      if(apiResponse.status === 200) {
        this.toastr.success('Group edited Successfully.');
       
      } else {
        this.toastr.error(apiResponse.message);
      }
    }, (err) => {
      this.toastr.error('Some error occured');
    })
    }
  }
  public DeleteRoom: any = () => {
    if(!this.roomName){
      this.toastr.warning('Please enter Group Name');
    }else
    {
      let data = {
        userId:this.receiverId,
        roomName: this.roomName
      }
      console.log(data)
    this.AppService.deleteRoom(data).subscribe((apiResponse) => {
      console.log(apiResponse);
  
      if(apiResponse.status === 200) {
        this.toastr.success('Group Deleted Successfully.');
       
      } else {
        this.toastr.error(apiResponse.message);
      }
    }, (err) => {
      this.toastr.error('Some error occured');
    })
    }
  }
  public joinChatRoom: any = () => {
    if(!this.roomName){
      this.toastr.warning('Please enter Group Name');
    }else
    {
      let data = {
        userId:this.receiverId,
        roomName: this.roomName
      }
      console.log(data)
    this.AppService.joinChatRoom(data).subscribe((apiResponse) => {
      console.log(apiResponse);
  
      if(apiResponse.status === 200) {
        this.toastr.success('Group Created Successfully.');
       
      } else {
        this.toastr.error(apiResponse.message);
      }
    }, (err) => {
      this.toastr.error('Some error occured');
    })
    }
  }
  public groupSelectedToChat: any = (id, name) => {

    this.groupMember = true;

    Cookie.set('receiverId', id);
    Cookie.set('receiverName', name);

    this.receiverId = id;
    this.receiverName = name;

  }
  public logout: any = () => {

    this.AppService.logout()
      .subscribe((apiResponse) => {

        if (apiResponse.status === 200) {
          console.log("logout called")
          Cookie.delete('authtoken');

          Cookie.delete('receiverId');

          Cookie.delete('receiverName');

          this.SocketService.exitSocket()

          this.router.navigate(['/']);

        } else {
          this.toastr.error(apiResponse.message)

        } // end condition

      }, (err) => {
        this.toastr.error('some error occured')


      });

  }

}