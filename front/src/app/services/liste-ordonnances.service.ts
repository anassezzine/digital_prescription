
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ListeOrdonnancesService {

    constructor(private http:HttpClient) { }
    saveOrdonnanceData(id:any) {
        localStorage.setItem("id", (id));
    }

    getAllOrdonnances(identifiantUser:any){
        return this.http.get('http://localhost:3000/ordonnance/getAllOrdonnances', identifiantUser).pipe(
          map((resp) => {
            return resp;
          })
        );
    }

}