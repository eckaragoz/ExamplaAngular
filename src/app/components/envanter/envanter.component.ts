import { Component, OnInit, Input} from '@angular/core';
import {MessageModule} from 'primeng/message';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {envantervo} from '../vo/envantervo'
import {personel} from '../vo/personel'
import {Md5} from 'ts-md5/dist/md5';


@Component({
  selector: 'app-envanter',
  templateUrl: './envanter.component.html',
  styleUrls: ['./envanter.component.scss']
})
export class EnvanterComponent implements OnInit {
  displayDialog: boolean;
  envanter:envantervo;
  selectedEnvanter: envantervo;
  newEnvanter:boolean;  
  envanterlist:envantervo[];
  cols: any[];
  msg:MessageModule[]=[];
  first: number = 0;  
  personellist:personel[]; 
  @Input() logsicil:String = "";
  turcheck:boolean = false;
  donanimCheck:boolean = false;
  

  constructor(private http:HttpClient) { }

  ngOnInit() {
    try
    {
     this.getEnvanterList().subscribe((data:any[]) =>     
      this.envanterlist = data),
      error => console.log(error); 
      this.getPersonelList();      
    }catch{this.msg.push({severity:'error', summary:'', detail:'Fail'});}
    
  }


  getEnvanterList()
  {
    let url = "https://uygyonetim.sgk.intra/WS_BYS/EnvanterList";
    return this.http.get(url);
  }

  getPersonelList()
  {
    let url = "https://uygyonetim.sgk.intra/WS_BYS/PersonelList";
    return this.http.get(url).subscribe((data:any[]) =>
    this.personellist = data),    
    error => console.log(error); 
  }
  

  reset() {
    this.first = 0;
}

/*exportPdf() {
  import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
          const doc = new jsPDF.default(0,0);
          doc.autoTable(this.columns, this.envanterlist);
          doc.save('EnvanterList.pdf');
      })
  })
}*/

onRowSelect(event) 
{
  this.newEnvanter = false;
  // this.envanter = this.cloneCar(event.data);
  console.log(event);
  this.displayDialog = true;

  if(this.selectedEnvanter.turu=='Fiziksel Sunucu' || this.selectedEnvanter.turu=='Switch' ||
     this.selectedEnvanter.turu=='Router' || this.selectedEnvanter.turu=='Güvenlik Cihazı' ||
     this.selectedEnvanter.turu=='Yük Dağıtıcı' || this.selectedEnvanter.turu=='Omurga'    ||
     this.selectedEnvanter.turu=='Power Distribution Units' || this.selectedEnvanter.turu=='San Switch/Director') 
     this.turcheck = true;
  else this.turcheck = false;

  if(this.selectedEnvanter.turu=='Fiziksel Sunucu') 
     this.donanimCheck = true;
  else this.donanimCheck = false;
}

EnvanterIslem()
{
  if (this.updateEnvanter(this.selectedEnvanter) > 0)
  {
    this.BarkotUret();
  }
}


BarkotUret()
{
  let barkotBilgi:envantervo = this.selectedEnvanter;    
  const md5 = new Md5();
  let currentDate = new Date();
  let pass = '1ced9cae-0288-42b9-9ac1-e881d193c40a';
  let timestamp = currentDate.getTime().toString();
  let sign = md5.appendStr(timestamp + pass).end().toString(); 
  try
  {
  let url = 'https://testgrp3.sgk.intra/SgkKarekodIntra/update/' + this.selectedEnvanter.barkodid;
  const headers = new HttpHeaders({'appId':'uygyonetim', 
                                   'pass' :pass, 
                                   'nonce':timestamp,
                                   'sign' :sign,
                                   'Content-Type':'application/json'});   
   
  this.http.put(url, {'hiddenData':this.barkotremovevariable(barkotBilgi)}, {headers}).subscribe((data:any)=>
   {
     if (data.responseCode=='0')
     {
      this.msg.push({severity:'success', summary:'', detail:'işlem başarılı'});
     }else this.msg.push({severity:'error', summary:'', detail:'Code: ' + data.responseCode+ ',Message: ' + data.responseMesssage});
   }
  ),
  error => console.log(error); 
  }catch(error){this.msg.push({severity:'error', summary:'', detail:'Hata: ' + error});}
}

BarkotGoster()
{
  let url = "https://testgrp3.sgk.intra/SgkKarekodIntra/" + this.selectedEnvanter.barkodid;
  //let url = "https://testgrp3.sgk.intra/SgkKarekodIntra/A4FK037LP9H75"
  window.open(url, '_blank');
}

barkotremovevariable(barkotBilgi:envantervo):envantervo
{
  delete barkotBilgi.sorumlu1["ad"];                                                           
  delete barkotBilgi.sorumlu1["soyad"];
  return barkotBilgi;
}

updateEnvanter(envanter:envantervo):number
{
  let kayit_id:number = 0;
  this.selectedEnvanter.sicil = this.logsicil;
  let url = 'https://uygyonetim.sgk.intra/WS_BYS/UpdateEnvanter';
  try
  {
  this.http.post(url, this.selectedEnvanter).subscribe((data:any)=>
   {
     if (data.responseCode=='1')
     {
      this.msg.push({severity:'success', summary:'', detail:'işlem başarılı'});
     }
     else 
      {
        this.msg.push({severity:'error', summary:'', detail:'Code: ' + data.responseCode+ ',Message: ' + data.responseMesssage});
        kayit_id = data.responseCode;
      }
   }
  ),
  error => console.log(error); 
 } catch(error){this.msg.push({severity:'error', summary:'', detail:'Hata: ' + error});}
 return kayit_id;
}



}
