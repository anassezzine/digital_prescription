import { Component } from '@angular/core';

@Component({
  selector: 'app-form-ordonnance',
  templateUrl: './form-ordonnance.component.html',
  styleUrls: ['./form-ordonnance.component.css']
})
export class FormOrdonnanceComponent {
  
  /*
  ajouterMedicament() {
    const medicamentDiv = document.createElement('div');
    medicamentDiv.classList.add('medicament');
    
    //code pour que medicamentDiv ait le meme style que les autres div de la classe medicament
    const medicamentsDiv = document.querySelector('#medicaments');
    if (medicamentsDiv) {
      medicamentsDiv.appendChild(medicamentDiv);
    }

    
    const nomLabel = document.createElement('label');
    nomLabel.textContent = 'Nom :';
    const nomInput = document.createElement('input');
    nomInput.type = 'text';
    nomInput.name = 'nom_medicament[]';
    nomInput.required = true;
    medicamentDiv.appendChild(nomLabel);
    medicamentDiv.appendChild(nomInput);
    medicamentDiv.appendChild(document.createElement('br'));
  
    const posologieLabel = document.createElement('label');
    posologieLabel.textContent = 'Posologie :';
    const matinCheckbox = document.createElement('input');
    matinCheckbox.type = 'checkbox';
    matinCheckbox.name = 'posologie[][]';
    matinCheckbox.value = 'matin';
    const matinLabel = document.createElement('label');
    matinLabel.textContent = 'Matin';
    matinLabel.setAttribute('for', 'matin');
    const midiCheckbox = document.createElement('input');
    midiCheckbox.type = 'checkbox';
    midiCheckbox.name = 'posologie[][]';
    midiCheckbox.value = 'midi';
    const midiLabel = document.createElement('label');
    midiLabel.textContent = 'Midi';
    midiLabel.setAttribute('for', 'midi');
    const soirCheckbox = document.createElement('input');
    soirCheckbox.type = 'checkbox';
    soirCheckbox.name = 'posologie[][]';
    soirCheckbox.value = 'soir';
    const soirLabel = document.createElement('label');
    soirLabel.textContent = 'Soir';
    soirLabel.setAttribute('for', 'soir');
    medicamentDiv.appendChild(posologieLabel);
    medicamentDiv.appendChild(document.createElement('br'));
    medicamentDiv.appendChild(matinCheckbox);
    medicamentDiv.appendChild(matinLabel);
    medicamentDiv.appendChild(midiCheckbox);
    medicamentDiv.appendChild(midiLabel);
    medicamentDiv.appendChild(soirCheckbox);
    medicamentDiv.appendChild(soirLabel);
    medicamentDiv.appendChild(document.createElement('br'));
  
    const quantiteLabel = document.createElement('label');
    quantiteLabel.textContent = 'Quantité :';
    const quantiteInput = document.createElement('input');
    quantiteInput.type = 'number';
    quantiteInput.name = 'quantite_medicament[]';
    quantiteInput.required = true;
    medicamentDiv.appendChild(quantiteLabel);
    medicamentDiv.appendChild(quantiteInput);
    medicamentDiv.appendChild(document.createElement('br'));
  
    const dureeLabel = document.createElement('label');
    dureeLabel.textContent = 'Durée :';
    const dureeInput = document.createElement('input');
    dureeInput.type = 'number';
    dureeInput.name = 'duree_medicament[]';
    dureeInput.required = true;
    medicamentDiv.appendChild(dureeLabel);
    medicamentDiv.appendChild(dureeInput);
    medicamentDiv.appendChild(document.createElement('br'));  
  } 
  */

  // Créer un nouveau bloc de médicament
  /*
  ajouterMedicament() {
    const medicamentOriginal = document.querySelector(".medicament") as HTMLElement;
    const nouveauMedicament = medicamentOriginal.cloneNode(true) as HTMLElement;
  
    const formulaire = document.querySelector("form");
    if (formulaire)
    formulaire.appendChild(nouveauMedicament);
  
    const inputs = nouveauMedicament.querySelectorAll("input[type='text'], input[type='number']") as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => input.value = "");
  }
  */
  ajouterMedicament() {
    const medicamentOriginal = document.querySelector(".medicament") as HTMLElement;
    const nouveauMedicament = medicamentOriginal.cloneNode(true) as HTMLElement;
  
    const boutonAjouter = document.createElement('button');
    boutonAjouter.textContent = "Ajouter un médicament";
    boutonAjouter.addEventListener('click', () => this.ajouterMedicament());
  
    nouveauMedicament.appendChild(boutonAjouter);
  
    const formulaire = document.querySelector("form");
    if (formulaire)
      formulaire.appendChild(nouveauMedicament);
  
    const inputs = nouveauMedicament.querySelectorAll("input[type='text'], input[type='number']") as NodeListOf<HTMLInputElement>;
    inputs.forEach(input => input.value = "");
  }
  
}
