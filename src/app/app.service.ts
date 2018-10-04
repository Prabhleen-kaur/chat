import { Injectable } from '@angular/core';
import{Observable} from 'rxjs/Observable';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import{HttpClient,HttpHeaders} from'@angular/common/http';
import{HttpErrorResponse,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {
 private baseUrl ='http://localhost:3000/api/v1'

  constructor(public http :HttpClient) { }
  public getUserInfoFromLocalStorage =()=>
  {
    return JSON.parse(localStorage.getItem('userInfo'))
  }

  public setUserInfoInLocalStorage =(data)=>
  {
    localStorage.setItem('userInfo',JSON.stringify(data))
  }
  public getRoomInfoFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('roomInfo'))
  }
  
  public setRoomInfoInLocalStorage = (data) => {
   localStorage.setItem('roomInfo', JSON.stringify(data))
  }
    
  public signupFunction(data):Observable<any>{
    const params = new HttpParams()
    .set('firstName',data.firstName)
    .set('lastName',data.lastName)
    .set('mobile',data.mobile)
    .set('email',data.email)
    .set('password',data.password)
    //.set('apiKey',data.apiKey)
    return this.http.post(`${this.baseUrl}/users/signup`,params)
  }
 
 
  public signinFunction(data):Observable<any>{
   const params = new HttpParams()
   .set('email',data.email)
   .set('password',data.password)
   return this.http.post(`${this.baseUrl}/users/login`,params)
 }
 public sendResetLinkFunction(data): Observable<any> {
  return this.http.get(`${this.baseUrl}/${data.email}/users/forgotPassword`);

}
public resetPassword(data): Observable<any> {

  const params = new HttpParams()
  .set('userId', data.userId)
  .set('password', data.password);

  return this.http.post(`${this.baseUrl}/users/resetPassword`, params) 
 }
 public changePassword(data): Observable<any> {

  const params = new HttpParams()
  .set('email', data.email)
  .set('password', data.password)
  .set('newPassword', data.newPassword);
  return this.http.post(`${this.baseUrl}/users/changePassword`, params) 
 }

 public logout(): Observable<any> {

  const params = new HttpParams()
    .set('authToken', Cookie.get('authtoken'))

  return this.http.post(`${this.baseUrl}/users/logout`, params);

} // end logout function
public createRoom(data): Observable<any> {
  const params = new HttpParams()
  .set('userId', data.userId)
  .set('roomName', data.roomName);

  return this.http.post(`${this.baseUrl}/chat/createChatRoom`, params);
  }
  public editRoom(data): Observable<any> {
    const params = new HttpParams()
    .set('roomName', data.roomName)
    .set('NewRoomName', data.NewRoomName);
  
    return this.http.put(`${this.baseUrl}/chat/editChatRoom`, params);
    }
    public deleteRoom(data): Observable<any> {
      const params = new HttpParams()
      .set('roomName', data.roomName)
      .set('userId', data.userId)
      .set('roomId', data.roomId);
    
      return this.http.put(`${this.baseUrl}/chat/deleteChatRoom`, params);
      }
  public getAllRooms(): Observable<any> {
    console.log('All rooms displayed');
    return this.http.get(`${this.baseUrl}/chat/getChatRooms`)
 
  }
  public joinChatRoom(data): Observable<any> {
    const params = new HttpParams()
    .set('userId', data.userId)
    .set('roomName', data.roomName);
  
    return this.http.post(`${this.baseUrl}/chat/joinChatRoom`, params);
    }


private handleError(err: HttpErrorResponse) {

  let errorMessage = '';

  if (err.error instanceof Error) {

    errorMessage = `An error occurred: ${err.error.message}`;

  } else {

    errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;

  } // end condition *if

  console.error(errorMessage);

  return Observable.throw(errorMessage);

}  // END handleError

}