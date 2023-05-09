import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  constructor(
    public userService :UserService,
    public router :Router

  ) {
    
   }


  onLogOutClicked(){
    this.userService.logOut();
    this.router.navigate(['/login']);
    return false;
  }

  //écrit une fonction getInitials() qui retourne les initiales de l'utilisateur connecté
  getInitials() {
    const currentUser = this.userService.getLoggedInUser();
  
    if (currentUser) { // check if currentUser is not null
      if (currentUser.nom && currentUser.prenom) { // check if currentUser.nom is not null
        console.log(currentUser);
        return currentUser.nom.charAt(0).toUpperCase()+currentUser.prenom.charAt(0).toUpperCase();
      }
    }
    return '';
  }
  

  //une fonction onProfileClicked() qui redirige vers la page profile

  onProfileClicked(){
    this.router.navigate(['/profile']);
    return false;
  }

}
