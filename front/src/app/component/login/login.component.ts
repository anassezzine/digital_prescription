import { Component } from '@angular/core';
import { Router } from  '@angular/router';

import { UserService } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  identifiant:string='';
  password:string='';

  constructor(private userservice:UserService ,private router:Router){

  }

  onLogin(){
    if(!this.identifiant || !this.password) {
      alert('All fields are required');
      return;
    }

    const user = {
      identifiant: this.identifiant,
      password: this.password
    }

    this.userservice.auth(user).subscribe( resp => 
      {

        if (!(resp as any).success) {
          alert((resp as any).message);
          return ;
        
        }
        this.userservice.saveUserDate((resp as any).user.token, (resp as any).user.nom, (resp as any).user.prenom, (resp as any).user.identifiant, (resp as any).user.email, (resp as any).user.numTel);
        this.router.navigate(['/home']);
      }
    );
  }

  
  onClickRegister(){
    console.log("register");
    this.router.navigate(['/register']);
  }  
}

