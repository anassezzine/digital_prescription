import { Component } from '@angular/core';
import { Router } from  '@angular/router';
import { ListeOrdonnancesService } from 'src/app/services/liste-ordonnances.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent {
    //rajouter les propriétés Id, Médecin, Date, Médicaments, Posologie, Durée

    _id: string= this.getidordonnace();
    medecin: string='';
    date: string='';
    medicaments: string='';
    posologie: string='';
    duree: string='';

    //déclare une variable qui ne va pas se considérer attribut de la classe et qui va contenir le retour de la fonction getSelectedOrdonnanceId
      
    constructor(public listeOrdonnancesService:ListeOrdonnancesService, public router :Router) {
      console.log(this.getOrdonnance(this._id));
    }   
    getidordonnace(): string{
      return localStorage.getItem('_id')||'';
    }

    getOrdonnance(id: any) {
      console.log(id);
      return this.listeOrdonnancesService.getOrdonnanceById(id).pipe(
        map((data: any) => {
          console.log(data);
          return data;
        })
      ).subscribe((data: any) => {
        // Handle the data here
        console.log(data);
      });
    }
    
};

