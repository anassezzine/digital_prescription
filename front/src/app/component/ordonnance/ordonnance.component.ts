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
  medicaments: { nom: string; quantite: { matin: string, midi: string, soir: string }; duree: string; }[] = [];

  constructor(public listeOrdonnancesService: ListeOrdonnancesService, public router: Router) {
    this.getOrdonnance(this._id);
  }

  getidordonnace(): string {
    return localStorage.getItem('_id') || '';
  }


  getOrdonnance(id: any) {

    this.listeOrdonnancesService.getOrdonnanceById(id).pipe(
      map((data: any) => {
        this.date = data.ordonnance.date.substr(0, 10);
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

  notifyOrdonnance() {
    console.log('notifyOrdonnance');
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    for (const medicament of this.medicaments) {
      const prescriptionDate = new Date(this.date);
      const durationInDays = parseInt(medicament.duree, 10);

      const morningTime = new Date(prescriptionDate.getFullYear(), prescriptionDate.getMonth(), prescriptionDate.getDate(), 8);
      const noonTime = new Date(prescriptionDate.getFullYear(), prescriptionDate.getMonth(), prescriptionDate.getDate(), 12);
      const eveningTime = new Date(prescriptionDate.getFullYear(), prescriptionDate.getMonth(), prescriptionDate.getDate());
      eveningTime.setHours(23, 45); // Réglage de l'heure sur 22h07


      const morningDueDate = new Date(morningTime.setDate(morningTime.getDate() + durationInDays));
      const noonDueDate = new Date(noonTime.setDate(noonTime.getDate() + durationInDays));
      const eveningDueDate = new Date(eveningTime.setDate(eveningTime.getDate() + durationInDays));

      if (today < morningDueDate) {
        this.scheduleNotification('matin', morningTime, medicament);
      }

      if (today < noonDueDate) {
        this.scheduleNotification('midi', noonTime, medicament);
      }

      if (today < eveningDueDate) {
        this.scheduleNotification('soir', eveningTime, medicament);
      }
    }
  }

  scheduleNotification(moment: string, dueTime: Date, medicament: any) {
    console.log('scheduleNotification');
    const currentDate = new Date();
    const currentTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    
    const dueDate =new Date();
    const dueTime1 = new Date(dueDate.getFullYear(), dueDate.getMonth(), dueDate.getDate());
    dueTime1.setHours(23, 25); // Réglage de l'heure sur 22h07

    console.log("current time",currentTime.getTime());
    console.log("due time",dueTime1.getTime());

    if (currentTime.getTime() <= dueTime1.getTime()) {
      console.log('je suis dans le if');
      console.log(`Il est temps de prendre le médicament ${medicament.nom} (${moment})`);
    }
  }



}