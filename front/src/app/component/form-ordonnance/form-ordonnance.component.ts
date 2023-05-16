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

  constructor(private listeOrdonnancesService: ListeOrdonnancesService) { }

  
  supprimerMedicament(event: Event) {
    const medicament = (event.target as HTMLElement).closest('.medicament');
    if (medicament && medicament.parentElement) {
      if (medicament.parentElement.children.length > 1) {
        medicament.parentNode?.removeChild(medicament);
      }
    }
  }
  

  ajouterMedicament() {
    const medicamentOriginal = document.querySelector(".medicament") as HTMLElement;
    const nouveauMedicament = medicamentOriginal.cloneNode(true) as HTMLElement;
  
    const boutonAjouter = document.createElement('button');
    boutonAjouter.textContent = "Ajouter un médicament";
    boutonAjouter.style.padding = "5px 10px";
    boutonAjouter.style.borderRadius = "5px";
    boutonAjouter.style.border = "none";
    boutonAjouter.style.backgroundColor = "#0fd7d7";
    boutonAjouter.style.color = "white";
    boutonAjouter.addEventListener('mouseover', () => boutonAjouter.style.backgroundColor = " #08bdbd");
    boutonAjouter.addEventListener('mouseout', () => boutonAjouter.style.backgroundColor = "#0fd7d7");
    boutonAjouter.style.cursor = "pointer"
    boutonAjouter.addEventListener('click', () => this.ajouterMedicament());
  
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = "Supprimer ce médicament";
    boutonSupprimer.style.padding = "5px 10px";
    boutonSupprimer.style.borderRadius = "5px";
    boutonSupprimer.style.border = "none";
    boutonSupprimer.style.marginLeft = "1%";
    boutonSupprimer.style.backgroundColor = "#f45454";
    boutonSupprimer.style.color = "white";
    boutonSupprimer.addEventListener('mouseover', () => boutonSupprimer.style.backgroundColor = "rgb(191, 32, 32)");
    boutonSupprimer.addEventListener('mouseout', () => boutonSupprimer.style.backgroundColor = "#f45454");
    boutonSupprimer.style.cursor = "pointer";
    boutonSupprimer.addEventListener('click', (event) => this.supprimerMedicament(event));
  
    nouveauMedicament.appendChild(boutonAjouter);
    if (nouveauMedicament !== medicamentOriginal) {
      nouveauMedicament.appendChild(boutonSupprimer);
    }
  
    const formulaire = document.querySelector("form");
    if (formulaire) {
      // Supprimer les boutons "ajouter un médicament" des sections précédentes
      const anciensBoutonsAjouter = formulaire.querySelectorAll(".ajouter-medicament-button");
      anciensBoutonsAjouter.forEach(bouton => bouton.remove());
  
      formulaire.appendChild(nouveauMedicament);
    }
  
    const inputs = nouveauMedicament.querySelectorAll("input[type='text'], input[type='number']") as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => input.value = "");
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

enregistrerOrdonnance() {
  const medecinNom = (document.getElementById('medecin_nom') as HTMLInputElement).value;
  const medecinPrenom = (document.getElementById('medecin_prenom') as HTMLInputElement).value;
  const date = (document.getElementById('date') as HTMLInputElement).value;

  const medicaments: { nom: string; posologie: any[]; quantite: string; duree: string; }[] = [];
  const medicamentElements = document.querySelectorAll('.medicament');
  medicamentElements.forEach((medicamentElement) => {
    const nom = (medicamentElement.querySelector('.nom_medicament') as HTMLInputElement).value;
    const posologie = Array.from(medicamentElement.querySelectorAll('.posologie input:checked')).map((input) => (input as HTMLInputElement).value);
    const quantite = (medicamentElement.querySelector('.quantite_medicament') as HTMLInputElement).value;
    const duree = (medicamentElement.querySelector('.duree_medicament') as HTMLInputElement).value;

    const medicament = {
      nom,
      posologie,
      quantite,
      duree
    };
    medicaments.push(medicament);
  });

  const ordonnanceData = {
    medecin_nom: medecinNom,
    medecin_prenom: medecinPrenom,
    date,
    medicaments
  };

  this.listeOrdonnancesService.createOrdonnance(ordonnanceData)
    .subscribe(
      (response) => {
        console.log(response);
        // Réinitialisez les valeurs du formulaire après l'enregistrement de l'ordonnance
        (document.getElementById('medecin_nom') as HTMLInputElement).value = '';
        (document.getElementById('medecin_prenom') as HTMLInputElement).value = '';
        (document.getElementById('date') as HTMLInputElement).value = '';
        const inputElements = document.querySelectorAll('.medicament input[type="text"], .medicament input[type="number"]');
        inputElements.forEach((inputElement) => {
          (inputElement as HTMLInputElement).value = '';
        });
        // Ajoutez ici la logique pour afficher un message de succès ou rediriger vers une autre page si nécessaire
      },
      (error) => {
        console.log(error);
        // Ajoutez ici la logique pour afficher un message d'erreur à l'utilisateur
      }
    );
}

}
