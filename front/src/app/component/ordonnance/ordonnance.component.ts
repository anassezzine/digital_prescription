import { Component } from '@angular/core';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent {
    //rajouter les propriétés Id, Médecin, Date, Médicaments, Posologie, Durée

    _id: string= this.getidordonnace();
    medecin: string='ftftft';
    date: string='';
    medicaments: string='';
    posologie: string='';
    duree: string='';

    //déclare une variable qui ne va pas se considérer attribut de la classe et qui va contenir le retour de la fonction getSelectedOrdonnanceId
      
    constructor() {
      this.getidordonnace();
    }   
    getidordonnace(): string{
      return localStorage.getItem('_id')||'';
    }
    
};

/*
import { Component } from '@angular/core';
export class OrdonnanceParams {
  constructor(
    public medecin: string,
    public date: string,
    public medicaments: string,
    public posologie: string,
    public duree: string
  ) {}
}

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent {
  id: number;
  medecin: string;
  date: string;
  medicaments: string;
  posologie: string;
  duree: string;
  
  static count = 1;

  constructor(params: OrdonnanceParams){
    this.id = OrdonnanceComponent.count++;
    this.medecin = params.medecin;
    this.date = params.date;
    this.medicaments = params.medicaments;
    this.posologie = params.posologie;
    this.duree = params.duree;
  }
}
*/