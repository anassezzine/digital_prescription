import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string='';
  email:string='';
  password:string='';

  constructor(private userservice:UserService ,private router:Router ){

  }


  onRegister() {
    if (!this.name || !this.email || !this.password) {
      alert('All fields are required');
      return;
    }
    const user={
      name:this.name,
      email:this.email,
      password:this.password  
    }
    
    this.userservice.createAccount(user).subscribe(resp => {
      if (!resp){
        alert('Error: '+resp)
      }


      alert("Account created")
      this.router.navigate(['/login']);
    });
  }

  
}
 