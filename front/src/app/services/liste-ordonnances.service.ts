/*
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
*/
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ListeOrdonnancesService {

  constructor(private http: HttpClient) { }

  saveOrdonnanceData(id: any) {
    localStorage.setItem("_id", (id));
  }

  createAuthHeader(headers: HttpHeaders) {
    const token = localStorage.getItem("authToken");
    headers=headers.append('Authorization', `Bearer ${token}`);
    return headers;
  }

  getAllOrdonnances(identifiantUser: any) {
    let headers = new HttpHeaders();
    headers=this.createAuthHeader(headers);
    return this.http.post('http://localhost:3000/ordonnance/getAllOrdonnances',identifiantUser, { headers }).pipe(
      map((resp) => {
        console.log(resp)
        return resp;
      })
    );
  }

  getnom(identifiant: any) {
    identifiant={identifiant}
    console.log(identifiant);
    return this.http.post('http://localhost:3000/users/getpro',identifiant).pipe(
      map((resp) => {
        console.log("resp",resp)
        return resp;
      })
    );
  }

  getOrdonnanceById(idOrdonnace: any) {
    let headers = new HttpHeaders();
    headers=this.createAuthHeader(headers);
    const id={_id:idOrdonnace}
    return this.http.post('http://localhost:3000/ordonnance/getOrdonnance',id).pipe(
      map((resp) => {
        console.log(resp)
        return resp;
      })
    );
  }

  createOrdonnance(ordonnanceData: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(`http://localhost:3000/ordonnance/addOrdonnance`, ordonnanceData, { headers });
  }


  
}



