import { Component } from '@angular/core';
import { OrdonnanceComponent } from 'src/app/component/ordonnance/ordonnance.component';

@Component({
  selector: 'app-liste-ordonnances',
  templateUrl: './liste-ordonnances.component.html',
  styleUrls: ['./liste-ordonnances.component.css']
})
export class ListeOrdonnancesComponent {
  //créer un tableau ordonnances de type ordonnanceComponent
  ordonnances: OrdonnanceComponent[] = [];
  selectedOrdonnanceId: number = -1; // initialiser la variable avec une valeur par défaut

  //ramplir le tableau ordonnances avec des données
  constructor() {
    this.ordonnances.push({
      id: 1,
      medecin: "Dr. John Doe",
      date: "13/02/2023",
      medicaments: "Doliprane",
      posologie: "1 comprimé par jour",
      duree: "1 semaine",

    });
    this.ordonnances.push({
      id: 2,
      medecin: "Dr. Martin Dupont",
      date: "25/02/2023",
      medicaments: "Doliprane",
      posologie: "1 comprimé par jour",
      duree: "1 semaine",


    });
    this.ordonnances.push({
      id: 3,
      medecin: "Dr. Marie Poirier",
      date: "02/03/2023",
      medicaments: "Doliprane",
      posologie: "1 comprimé par jour",
      duree: "1 semaine",
    });
  }

  //écrit la fonction onOrdonnanceClicked
  onOrdonnanceClicked(id:number) {
    //affiche dans la console le message "Ordonnance clicked"
    console.log("Ordonnance clicked");
    //affiche dans la console l'identifiant de l'ordonnance
    console.log(id);
    this.selectedOrdonnanceId = id;

    //redirige vers la page ordonnance/id
    window.location.href = "/ordonnance/" + id; 
  
  }

}
