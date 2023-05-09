import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: any;

  constructor(private userService: UserService) {
    this.user = this.userService.getLoggedInUser();
    console.log(this.user.nameUser);
  }
}
