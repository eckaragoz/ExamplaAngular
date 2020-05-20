import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {uservo} from './components/vo/uservo'



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  dns = 'http://localhost:8080';

  constructor(private httptoken:HttpClient, private http:HttpClient) { }

  private loggedInStatus = false;
  



  setLoggedIn(value:boolean)
  {
    this.loggedInStatus = value;    
  }

  get isloggedIn()
  {
    return this.loggedInStatus;
  }

  getToken2()
  {                    
        let url =  this.dns + "/WS_SPORYAL/authenticate";
        return this.http.post(url, {"username":"sporyal_2020","password":"password"})        
  }
 
  getLogin(userName, passWord)
  {        
    let url =   this.dns + "/WS_SPORYAL/UserLoginCheck";  
    return this.http.post(url,{},{headers: {'username': userName,'passWord': passWord, 'Content-Type': 'application/json'}})
  }
 

  postNewUser(newuser:uservo)
  {            
      let url =  this.dns + "/WS_SPORYAL/UserInsert" ;
      return this.http.post(url,newuser)   
  }



  
}
