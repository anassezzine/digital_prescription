import { Component } from '@angular/core';
import { Router } from  '@angular/router';

import { UserService } from 'src/app/services/user.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  email:string='';
  password:string='';

  constructor(private userservice:UserService ,private router:Router){

  }

  onLogin(){
    if(!this.email || !this.password) {
      alert('All fields are required');
      return;
    }

    const user = {
      email: this.email,
      password: this.password
    }

    this.userservice.auth(user).subscribe( resp => 
      {
        /*console.log((resp as any).message);
        return;*/
        if (!(resp as any).success) {
          alert((resp as any).message);
          return ;
        
        }
        //console.log(resp as any);
        this.userservice.saveUserDate((resp as any).user.token, (resp as any).user.name);
        this.router.navigate(['/main']);
      }
    );
  }

}
