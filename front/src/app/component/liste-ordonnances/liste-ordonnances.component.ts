import { Component, OnInit } from '@angular/core';
import { OrdonnanceComponent } from 'src/app/component/ordonnance/ordonnance.component';
import { ListeOrdonnancesService } from 'src/app/services/liste-ordonnances.service';
import {Router} from '@angular/router';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-liste-ordonnances',
  templateUrl: './liste-ordonnances.component.html',
  styleUrls: ['./liste-ordonnances.component.css']
})
export class ListeOrdonnancesComponent implements OnInit {
  //créer un tableau ordonnances de type ordonnanceComponent
  ordonnances: OrdonnanceComponent[] = [];

  ngOnInit() {
    this.displayAllOrdonnances();
    this.notifyAllOrdonnances();
  }
  //ramplir le tableau ordonnances avec des données
  constructor(  public listeOrdonnancesService:ListeOrdonnancesService, public router :Router) {
    OrdonnanceComponent.number=1;
  }

  //écrit la fonction onOrdonnanceClicked
  onOrdonnanceClicked(id:any) {

    this.listeOrdonnancesService.saveOrdonnanceData(id);
    this.router.navigate([`ordonnance/:${{id}}`]);
    return ;
  }

  getnom(ordonnance: any): Observable<any> {
    return this.listeOrdonnancesService.getnom(ordonnance.id_pro).pipe(
      map((data: any) => {
        return data.user.nom;
      })
    );
  }

  displayAllOrdonnances() {
    const id_patient = localStorage.getItem('identifiant') ? Number(localStorage.getItem('identifiant')) : -1;
    const query = { id_patient: id_patient };
    this.listeOrdonnancesService.getAllOrdonnances(query).subscribe((data: any) => {
      if (data) {
        const ordonnanceList: OrdonnanceComponent[] = []; // Utilisez le type OrdonnanceComponent[]
  
        const observables: Observable<any>[] = [];
        //remplir liste des noms
        console.log(data.ordonnance)
        for (const ordonnance of data.ordonnance) {
          observables.push(this.getnom(ordonnance));
          
        }
        
        forkJoin(observables).subscribe((results: any[]) => {
          for (let i = 0; i < results.length; i++) {
            const ordonnance = data.ordonnance[i];
            const nom = results[i];
  
            const ordonnanceObj = new OrdonnanceComponent(this.listeOrdonnancesService, this.router);
            ordonnanceObj.num=OrdonnanceComponent.number++;
            ordonnanceObj._id = ordonnance._id;
            ordonnanceObj.medecin = nom;
            ordonnanceObj.date = ordonnance.date;
  
            ordonnanceList.push(ordonnanceObj);
          }
          this.ordonnances = ordonnanceList;
          console.log(this.ordonnances);
        });
      }
    });
  }
  
  notifyAllOrdonnances() {
    setInterval(() => {
      this.ordonnances.forEach((ordonnance: OrdonnanceComponent) => {
        ordonnance.notifyOrdonnance();        
      });
    }, 60000); // Vérification toutes les 60 secondes
  }
  
}
