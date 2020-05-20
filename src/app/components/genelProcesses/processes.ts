import { Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { uservo } from '../vo/uservo';
import {MessageModule} from 'primeng/message';


@Injectable()
export class processes {

    loginUserBilgi : uservo;
    msg:MessageModule[]=[];
  static pipe: any;

    constructor() {}
    

    static getformatedDate(tarih:Date): String 
    {
        let formatedDate = "";
        let day = tarih.getDate();
        let mount = tarih.getMonth() + 1;
        let year = tarih.getFullYear();
        formatedDate = year+"-"+ mount+"-"+day;   
        console.log(formatedDate);
      return formatedDate;
    }

    static getlastDayofMonth(tarih:Date)
    {   
        let formatedDate = "";   
        let lastDayOfMonth = new Date(tarih.getFullYear(), tarih.getMonth()+1, 0);  
        let day = lastDayOfMonth.getDate();              
        let mount = lastDayOfMonth.getMonth() + 1;
        let year = lastDayOfMonth.getFullYear();
        formatedDate = year+"-"+ mount+"-"+day;       
        console.log(formatedDate);
      return formatedDate;
    }

    static getAnaSayfaYonlendir(url, router : Router, userName) 
    {
      console.log(userName+ "Ana Sayfa Yönlendirmesi");                   
      router.navigate([url],  {state: {username: userName}}).then(
      nav => 
      {
        console.log(nav); // true if navigation is successful
      }, 
      err => 
      {
        console.log(err) // when there's an error
      });     
    }

    static getSayfaYonlendir(url, router : Router) 
    {                     
      router.navigate([url]).then(
      nav => 
      {
        console.log(nav); // true if navigation is successful
      }, 
      err => 
      {
        console.log(err) // when there's an error
      });     
    }

    static getCurrentDate()
    { 
      let formatedDate = "";       
      let currentdate = new Date(); 
      let day = currentdate.getDate().toString().length == 1 ? '0' + currentdate.getDate().toString() : currentdate.getDate().toString();              
      let mount = (currentdate.getMonth()+1).toString().length == 1 ? '0' + (currentdate.getMonth()+1).toString() : (currentdate.getMonth()+1).toString();
      let year = currentdate.getFullYear();
      formatedDate = year+"-"+ mount+"-"+day;        
      console.log(formatedDate);
      return formatedDate;
    }

    

   
}