import { Component } from '@angular/core';
import { ListeOrdonnancesService } from 'src/app/services/liste-ordonnances.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-form-ordonnance',
  templateUrl: './form-ordonnance.component.html',
  styleUrls: ['./form-ordonnance.component.css']
})
export class FormOrdonnanceComponent {

  patientNom: string = '';
  patientPrenom: string = '';
  medicaments: { nom: string; quantite: {matin:string, midi:string,soir:string}; duree: string; }[] = [];

  constructor(private listeOrdonnancesService: ListeOrdonnancesService) { }

  supprimerMedicament(index: number) {
    if (this.medicaments.length > 1) {
      this.medicaments.splice(index, 1);
    }
  }

  ajouterMedicament() {
    const nouvelMedicament = {
      nom: '',
      quantite: {matin:'', midi:'',soir:''},
      duree: ''
    };
    this.medicaments.push(nouvelMedicament);
  }

  enregistrerOrdonnance() {
    console.log('Je suis dans la fonction enregistrerOrdonnance');
  
    const ordonnanceData = {
      id_pro: localStorage.getItem('identifiant'),
      // Ajoutez la logique pour récupérer l'identifiant du patient du formulaire
      id_patient: (document.getElementById('id_patient') as HTMLInputElement).value ,
      date: this.getCurrentDateTime(),
      medicaments: this.medicaments
    };
    console.log(ordonnanceData);
  
    this.listeOrdonnancesService.createOrdonnance(ordonnanceData)
      .subscribe(
        (response) => {
          console.log(response);
          // Réinitialiser les valeurs du formulaire après l'enregistrement de l'ordonnance
          this.patientNom = '';
          this.patientPrenom = '';
          this.medicaments = [];
          // Ajoutez ici la logique pour afficher un message de succès ou rediriger vers une autre page si nécessaire
        },
        (error) => {
          console.log(error);
          // Ajoutez ici la logique pour afficher un message d'erreur à l'utilisateur
        }
      );
  }
  

  getCurrentDateTime() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Ajoute 1 car le mois est indexé à partir de 0
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return `${formattedDate} ${formattedTime}`;
  }
}
