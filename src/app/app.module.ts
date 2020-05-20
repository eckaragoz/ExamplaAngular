import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {MessagesModule} from 'primeng/messages';
import {PanelModule} from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import {PanelMenuModule} from 'primeng/panelmenu';
import { HeaderComponent } from './components/headers/header.component';
import { FooterComponent } from './components/footers/footer.component';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {DialogModule} from 'primeng/dialog';
import { AnaSayfaComponent } from './components/home/ana-sayfa.component';
import {AutGuard} from './aut.guard'
import {InputTextareaModule} from 'primeng/inputtextarea'
import {DropdownModule} from 'primeng/dropdown';



import {AuthService} from '../../src/app/interceptors/auth.service';
import { EnvanterComponent } from './components/envanter/envanter.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,    
    HeaderComponent,
    FooterComponent,    
    AnaSayfaComponent,
    EnvanterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    MessagesModule,
    PanelModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ButtonModule,
    HttpClientModule,
    PanelMenuModule,
    TableModule,
    CalendarModule,
    DialogModule,
    InputTextareaModule,
    DropdownModule
    
  ],
  providers: [AutGuard, { provide: HTTP_INTERCEPTORS, useClass: AuthService, multi: true }] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
