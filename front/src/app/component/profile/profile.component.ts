import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any;
  nom: string = '';
  prenom: string = '';
  identifiant: string = '';
  email: string = '';
  numTel: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.user = this.userService.getLoggedInUser();
    if (this.user) {
      this.nom = this.user.nom;
      this.prenom = this.user.prenom;
      this.identifiant = this.user.identifiant;
      this.email = this.user.email;
      this.numTel = this.user.numTel;
    }
  }

  onClickUpdateProfile() {
    const updatedProfile = {
      nom: this.nom,
      prenom: this.prenom,
      identifiant: this.identifiant,
      email: this.email,
      numTel: this.numTel
    };

    this.userService.updateUserProfile(updatedProfile).subscribe((resp: any) => {
      
        alert(resp.message);
        
      // Succès de la mise à jour du profil
      // Effectuez les actions supplémentaires nécessaires ici
    });
  }
}
