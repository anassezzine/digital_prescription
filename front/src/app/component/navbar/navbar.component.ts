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
    //const currentUser = this.userService.getUserName();
    //console.log(currentUser);
   }


  onLogOutClicked(){
    this.userService.logOut();
    this.router.navigate(['/login']);
    return false;
  }
}
