import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule  } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomeComponent } from './component/home/home.component';



import { UserService } from './services/user.service';
import { AuthGuard } from './gaurds/auth.guard';
import {ListeOrdonnancesService} from './services/liste-ordonnances.service';
import { ListeOrdonnancesComponent } from './component/liste-ordonnances/liste-ordonnances.component';
import { OrdonnanceComponent } from './component/ordonnance/ordonnance.component';
import { FooterComponent } from './component/footer/footer.component';
import { ProfileComponent } from './component/profile/profile.component';
import { FormOrdonnanceComponent } from './component/form-ordonnance/form-ordonnance.component';


const AppRoutes: Routes=[
  {path: '', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  {path: 'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path: 'Ordonnances', component:ListeOrdonnancesComponent, canActivate:[AuthGuard]},
  {path: 'ordonnance', component:OrdonnanceComponent, canActivate:[AuthGuard]},
  {path: 'profile', component:ProfileComponent, canActivate:[AuthGuard]},
  {path: 'formOrdonnance', component:FormOrdonnanceComponent, canActivate:[AuthGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    ListeOrdonnancesComponent,
    OrdonnanceComponent,
    FooterComponent,
    ProfileComponent,
    FormOrdonnanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes)
  ],
  providers: [
    UserService,
    AuthGuard,
    ListeOrdonnancesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
