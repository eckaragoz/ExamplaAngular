import { Component, OnInit} from '@angular/core';
import {MessageModule} from 'primeng/message';
import {AuthenticationService} from '../../authentication.service'
import {processes} from '../genelProcesses/processes'
import { messagesrv } from '../vo/message';
import { Router } from '@angular/router';
import {VariablesActionsService} from '../../variables-actions.service';
import { HttpClient } from '@angular/common/http'
import { token } from '../vo/token';
import {uservo} from '../vo/uservo'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {

  userName: String;
  password: String;
  msg:MessageModule[]=[];
  msgnewuser:MessageModule[]=[];
  displayDialog: boolean = false;  
  newuser:uservo = {username:"",date:"",password:"",passwordconfirm:"",status:""};


  constructor(private auth:AuthenticationService, private router:Router, private vbservice:VariablesActionsService, private http:HttpClient) { }

  ngOnInit() { }  
 

  LoginCheck()
  {     
    try
    {   
       this.auth.getToken2()
       .subscribe((data:token) =>      
       {
        localStorage.setItem("token", `${data.token}`)               
        this.auth.getLogin(this.userName , btoa(this.password.toString()))
        .subscribe((datalogin:messagesrv) =>     
        {         
          if(datalogin!=undefined)        
            if(datalogin.responseCode != '0') 
            {        
              this.auth.setLoggedIn(true);
              processes.getAnaSayfaYonlendir('/anaSayfa', this.router, this.userName);             
              localStorage.setItem('username', this.userName.toString());                        
            }
            else{this.msg = []; this.msg.push({severity:'error', summary:'', detail:'Login Error '});} 
          }
          ,
          error => console.log(error)   
        ) 
       });                     
    }catch(e){console.log("Web Servis Hata" + e);} 
  }

  OpenNewUserDialog()
  {
    this.displayDialog = true;    
  }


  AddNewUser()
  {    
    if(this.newuser.password ==  this.newuser.passwordconfirm)
    {
      if(this.password!='')
      {    
          this.newuser.date = processes.getCurrentDate();
          this.newuser.status = 1;
          this.newuser.password = btoa(this.newuser.password.toString())
          this.auth.postNewUser(this.newuser)
          .subscribe((datanewuser:messagesrv)=>
           {
             if (datanewuser.responseCode==1)  {this.msgnewuser = []; this.msgnewuser.push({severity:'success', summary:'', detail:'işlem başarılı'});}
             else {this.msgnewuser = []; this.msgnewuser.push({severity:'error', summary:'', detail:'işlem başarısız'});}
           }
          )
      }else {this.msgnewuser = []; this.msgnewuser.push({severity:'error', summary:'', detail:'Password boş geçilemez'});}
    }else {this.msgnewuser = []; this.msgnewuser.push({severity:'error', summary:'', detail:'Şifre Doğrulama Hatalı '});}
    
    
  }




   
}


    
  
  
  


