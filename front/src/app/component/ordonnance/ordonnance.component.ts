import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeOrdonnancesService } from 'src/app/services/liste-ordonnances.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent {
  _id: string = this.getidordonnace();
  medecin: string = '';
  date: string = '';
  medicaments:any=[] ;

  constructor(public listeOrdonnancesService: ListeOrdonnancesService, public router: Router) {
    this.getOrdonnance(this._id);
  }

  getidordonnace(): string {
    return localStorage.getItem('_id') || '';
  }

  getOrdonnance(id: any) {
    
    this.listeOrdonnancesService.getOrdonnanceById(id).pipe(
      map((data: any) => {
        this.date=data.ordonnance.date.substr(0, 10);
        for (const medicamentData of data.ordonnance.medicaments) {
          this.medicaments.push(medicamentData);
        }
        return this.getnom(data.ordonnance);
      })
    ).subscribe((observable: Observable<string>) => {
      observable.subscribe((medecin: string) => {
        this.medecin = medecin;
      });
    });
  }

  getnom(ordonnance: any): Observable<string> {
    return this.listeOrdonnancesService.getnom(ordonnance.id_pro).pipe(
      map((data: any) => {
        return data.user.nom;
      })
    );
  }


}