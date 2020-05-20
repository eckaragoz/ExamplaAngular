import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../authentication.service';

@Injectable()
export class AuthService implements HttpInterceptor{
   
   constructor(private aut:AuthenticationService) { }
   


   intercept(request: HttpRequest<any>, next: HttpHandler) 
    {
      const tokenls =  localStorage.getItem("token");        
        let newRequest: HttpRequest<any>;           
        //if (request.url != "https://uygyonetim.sgk.intra/WS_BYS/authenticate") 
        if (request.url != "http://localhost:8080/WS_SPORYAL/authenticate") 
        {  
                                                 
               newRequest = request.clone({headers: request.headers.set("Authorization", `Bearer ${tokenls}`)});                               
                         
        } else newRequest = request.clone(); 
        return next.handle(newRequest)                        
    }   
    


  
}




