import { Component } from '@angular/core';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent {
    //rajouter les propriétés Id, Médecin, Date, Médicaments, Posologie, Durée
    id: number=0;
    medecin: string='';
    date: string='';
    medicaments: string='';
    posologie: string='';
    duree: string='';
    
    constructor() { }

    
}
