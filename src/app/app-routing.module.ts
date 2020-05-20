import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {AnaSayfaComponent} from './components/home/ana-sayfa.component'
import {AutGuard} from './aut.guard'



const routes: Routes = [
  {
    path : 'login' , component : LoginComponent
  } 
  , 
  {
    path: 'anaSayfa',
    component:AnaSayfaComponent ,
    canActivate :[AutGuard]   
  } 
  ,   
  {
    path : '**' , component : LoginComponent
  } 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
