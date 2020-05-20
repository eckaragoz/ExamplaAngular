import { Injectable } from '@angular/core';
import {uservo} from './components/vo/uservo'

@Injectable({
  providedIn: 'root'
})
export class VariablesActionsService {

  constructor() { }

  loginUserData : uservo;

  private selectedMenuItem: String = '0';

  setloginUserData(value:uservo)
  {
    this.loginUserData = value;
    
  }

  get getloginUserData()
  {
    return this.loginUserData;
  }    

  
}
