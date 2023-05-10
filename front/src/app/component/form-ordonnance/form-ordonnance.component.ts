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
    boutonAjouter.className = "ajouter-medicament-button";
    
    boutonAjouter.classList.add("ajouter-medicament-button");
    boutonAjouter.addEventListener('click', () => this.ajouterMedicament());
  
    const boutonSupprimer = document.createElement('button');
    boutonSupprimer.textContent = "Supprimer ce médicament";
    boutonSupprimer.className = "supprimer-medicament-button";
    boutonSupprimer.classList.add("supprimer-medicament-button");
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
  
  
}
