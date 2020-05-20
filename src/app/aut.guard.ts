import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AutGuard implements CanActivate{

  constructor(private auth:AuthenticationService){}

  canActivate(
      next:ActivatedRouteSnapshot,
      state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.auth.isloggedIn;
    }
  }