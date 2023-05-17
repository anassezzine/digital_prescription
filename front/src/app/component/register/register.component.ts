import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  nom: string='';
  prenom: string='';
  identifiant:string='';
  email:string='';
  numTel:string='';
  password:string='';

  constructor(private userservice:UserService ,private router:Router ){

  }


  onRegister() {
    if (!this.nom || !this.identifiant || !this.password || !this.prenom || !this.email || !this.numTel) {
      alert('All fields are required');
      return;
    }
    const user={
      nom:this.nom,
      identifiant:this.identifiant,
      password:this.password ,
      prenom:this.prenom,
      email:this.email,
      numTel:this.numTel,
    }
    
    this.userservice.createAccount(user).subscribe(resp => 
    {
      if (!(resp as any).success){
        alert('Error: '+(resp as any).message);
      }else{
        alert("Account created")
        this.router.navigate(['/login']);
      }
    });
  }

  
}
 