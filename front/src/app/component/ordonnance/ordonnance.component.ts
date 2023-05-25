import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ListeOrdonnancesService } from 'src/app/services/liste-ordonnances.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as jsPDF from 'jspdf';
//import * as nodemailer from 'nodemailer';


@Component({
  selector: 'app-ordonnance',
  templateUrl: './ordonnance.component.html',
  styleUrls: ['./ordonnance.component.css']
})
export class OrdonnanceComponent {
  _id: string = this.getidordonnace();
  medecin: string = '';
  date: string = '';
  num:number=0;
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
  

    for (const medicament of this.medicaments) {
      const prescriptionDate = new Date(this.date);
      const durationInDays = parseInt(medicament.duree, 10);
      //créer une variable endDay qui est la date de fin de la prise du médicament
      const endDay = new Date(prescriptionDate.getFullYear(), prescriptionDate.getMonth(), prescriptionDate.getDate() + durationInDays);


       //écrit une variable morningDueTime qui est l'horaire de prise du médicament le matin à 8h00min00s
      const morningTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 50, 0);
      //écrit une variable noonDueTime qui est l'horaire de prise du médicament le midi à 12h00min00s
      const noonTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 12, 0 , 0);
      //écrit une variable eveningDueTime qui est l'horaire de prise du médicament le soir à 20h00min00s
      const eveningTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 20, 0 , 0);

      //si la date de fin de prise du médicament est supérieure à la date du jour
      if (currentDate.getTime() <= endDay.getTime()) {
        this.scheduleNotification('matin', morningTime, medicament);
        this.scheduleNotification('midi', noonTime, medicament);
        this.scheduleNotification('soir', eveningTime, medicament);
      }
    }
  }

  scheduleNotification(moment: string, dueTime: Date, medicament: any) {
    console.log('scheduleNotification');
    const currentTime = new Date();
  
    if ((dueTime.getTime() >= ((currentTime.getTime())-60000)) && (dueTime.getTime() <= ((currentTime.getTime())+60000))) {
      const email = localStorage.getItem('email') || '';
      if(moment === 'matin'){
        const messageMatin = 'Il est l\'heure de prendre '+medicament.quantite.matin +' dose(s) de ' + medicament.nom + ' du ' + moment; 
        alert(messageMatin);
        //this.sendMailNotification(email, messageMatin);  
      }else if(moment === 'midi'){
        const messageMidi ='Il est l\'heure de prendre '+medicament.quantite.midi +' dose(s) de ' + medicament.nom + ' du ' + moment;
        alert(messageMidi);
        //this.sendMailNotification(email, messageMidi); 
      }else if(moment === 'soir'){
        const messageSoir = 'Il est l\'heure de prendre '+medicament.quantite.soir +' dose(s) de ' + medicament.nom + ' du ' + moment;
        alert(messageSoir);
        //this.sendMailNotification(email, messageSoir);
      }

    }
  }

  /*
  async sendMailNotification(email: string, message: string) {
    // Configurer le transporteur Nodemailer
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Remplacez par le serveur SMTP réel
      port: 587, // Remplacez par le port SMTP réel
      secure: false, // true pour le port sécurisé (par exemple, 465)
      auth: {
        user: 'kamiliachaker@gmail.com', // Remplacez par votre adresse e-mail
        pass: 'kaki' // Remplacez par votre mot de passe d'e-mail
      }
    });
  
    try {
      // Envoyer l'e-mail
      const mailOptions = {
        from: 'kamiliachaker@gmail.com', // Remplacez par votre adresse e-mail
        to: email,
        subject: 'Notification d\'ordonnance',
        text: message
      };
  
      const info = await transporter.sendMail(mailOptions);
      console.log('E-mail sent:', info.response);
    } catch (error) {
      console.error('Error sending e-mail:', error);
    }
  }
  */
  
  telechargerPDF() {
    const doc = new jsPDF.default();

    // Titre de l'ordonnance
    doc.setFontSize(16);
    doc.setFont('bold');
    doc.text('Ordonnance : ' + this._id, 20, 20);

    // Liste des médicaments
    doc.setFontSize(12);
    let posY = 40;
    for (const medicament of this.medicaments) {
      doc.text('Médicaments : ' + medicament.nom, 20, posY);
      posY += 10;
      doc.text(
        'A prendre : ' +
        medicament.quantite.matin +
        ' fois le matin, ' +
        medicament.quantite.midi +
        ' fois le midi et ' +
        medicament.quantite.soir +
        ' fois le soir',
        30,
        posY
      );
      posY += 10;
      doc.text('Pendant : ' + medicament.duree+'jours', 30, posY);
      posY += 20;
    }

      // Informations du médecin et de la date
      doc.setFontSize(12);
      doc.setFont('italic');
      doc.text('Prescription établie par le Dr ' + this.medecin, 20, posY);
      posY += 10;
      doc.text('Le ' + this.date, 20, posY);

      // Enregistrez le fichier PDF
      doc.save('ordonnance.pdf');
  }
}  
