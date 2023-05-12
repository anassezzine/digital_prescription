import { Component } from '@angular/core';

@Component({
  selector: 'app-form-ordonnance',
  templateUrl: './form-ordonnance.component.html',
  styleUrls: ['./form-ordonnance.component.css']
})
export class FormOrdonnanceComponent {
  
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
}
