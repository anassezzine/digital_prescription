import { Component } from '@angular/core';
import { OrdonnanceComponent } from 'src/app/component/ordonnance/ordonnance.component';
import { ListeOrdonnancesService } from 'src/app/services/liste-ordonnances.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-liste-ordonnances',
  templateUrl: './liste-ordonnances.component.html',
  styleUrls: ['./liste-ordonnances.component.css']
})
export class ListeOrdonnancesComponent {
  //créer un tableau ordonnances de type ordonnanceComponent
  ordonnances: OrdonnanceComponent[] = [];
  static selectedOrdonnanceId: number = -1; // initialiser la variable avec une valeur par défaut

  //ramplir le tableau ordonnances avec des données
  constructor(  public listeOrdonnancesService:ListeOrdonnancesService, public router :Router) {
    /*
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
    */
  }

  //écrit la fonction onOrdonnanceClicked
  onOrdonnanceClicked(id:number) {

    this.listeOrdonnancesService.saveOrdonnanceData(id);
    this.router.navigate([`ordonnance/:${{id}}`]);
    return ;
  }

  displayAllOrdonnances() {
    const identifiantUser = localStorage.getItem('identifiant') ? Number(localStorage.getItem('identifiant')) : -1;
    this.listeOrdonnancesService.getAllOrdonnances(identifiantUser).subscribe((data: any) => {
      console.log(data);
      if (data) {
        this.ordonnances = data;
      }
    });
  }

}
