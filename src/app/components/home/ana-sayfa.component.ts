import { Component,  OnInit, Input, } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { ActivatedRoute  } from '@angular/router';
import { uservo } from '../vo/uservo';
import {VariablesActionsService} from '../../variables-actions.service'
import {processes} from '../genelProcesses/processes'
import { Router } from '@angular/router';

@Component({
  selector: 'app-ana-sayfa',
  templateUrl: './ana-sayfa.component.html',
  styleUrls: ['./ana-sayfa.component.scss']  
})
export class AnaSayfaComponent implements OnInit { 
  
  constructor(private router:Router, private  vbaction:VariablesActionsService){ }

  menuItem : String = '0';
  @Input() items:MenuItem[];
  loginUserData :uservo;
  username;
  logsicil;
 
  
  ngOnInit() {
    this.items = [
      {
        label: 'Ana Sayfa',
        icon: 'pi pi-pw pi-home',
        command: (event: Event) => this.clickNew('0')                 
      },    

      {
        label: 'Envanter',
        icon: 'pi pi-pw pi-file',
        items: [{
                label: 'Envanter Listesi', 
                icon: 'pi pi-fw pi-search',
                command: (event: Event) => this.clickNew('3')                  
            }          
        ]          
    },

      {
        label: 'Raporlar',
        icon: 'pi pi-pw pi-file',
        items: [{
                label: 'Karne Bilgi Raporu', 
                icon: 'pi pi-fw pi-plus',
                command: (event: Event) => this.clickNew('1')                  
            }          
        ]          
    },
    {
      label: 'Çıkış',
      icon: 'pi pi-fw pi-times',
      command: (event: Event) => this.clickNew('-1')                 
    },
    
    ];
     
    
    this.loginUserData = this.vbaction.getloginUserData;
    this.username = localStorage.getItem('username'); 
    this.logsicil = localStorage.getItem('logsicil'); 

    if (this.loginUserData!=undefined)
    {
      console.log("HOŞGELDİN " +this.loginUserData.username);
    }
    else console.log("Login User Bilgileri alınamadı");
  }

  clickNew(selectedMenuItem:String)
  {
    this.menuItem = selectedMenuItem;    
    if (selectedMenuItem=='-1') processes.getSayfaYonlendir('/login',this.router); 
  }

   


}
