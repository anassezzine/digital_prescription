import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient) { }
  

  createAuthHeader(headers: HttpHeaders) {
    const token = localStorage.getItem("authToken");
    headers=headers.append('Authorization', `Bearer ${token}`);
    return headers;
  }

  createAccount(user:any){
    return this.http.post('http://localhost:3000/users/register', user).pipe(
      map((resp) => {
        return resp;
      })
    );
  }


  auth(user:any){
    return this.http.post('http://localhost:3000/users/auth', user).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  updateUserProfile(user:any){
    let headers = new HttpHeaders();
    headers=this.createAuthHeader(headers);
    console.log("yo")
    return this.http.post('http://localhost:3000/users/updateUserInfo', user ,{ headers }).pipe(
      map((resp) => {
        return resp;
      })
    );
  }

  saveUserDate(token:any, nom:any, prenom:any, identifiant:any,email:any,numTel:any) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("nom", (nom));
    localStorage.setItem("prenom", (prenom));
    localStorage.setItem("identifiant", (identifiant));
    localStorage.setItem("email", (email));
    localStorage.setItem("numTel", (numTel));

  }

  isLoggedIn() :boolean {
    return !!localStorage.getItem("authToken");
  }

  logOut() {
    localStorage.clear();
  }

  getLoggedInUser() {
    if (this.isLoggedIn()) {
      const user = {
        authToken: localStorage.getItem("authToken"),
        nom: localStorage.getItem("nom"),
        prenom: localStorage.getItem("prenom"),
        identifiant: localStorage.getItem("identifiant"),
        email: localStorage.getItem("email"),
        numTel: localStorage.getItem("numTel")
        
      };
      return user;
    }
    return null;
  }

  isLoggedInPatient() :boolean {
    return !!localStorage.getItem("authToken")&&localStorage.getItem("identifiant")?.length==13;
  }

  isLoggedInPro() :boolean {
    return !!localStorage.getItem("authToken")&&localStorage.getItem("identifiant")?.length==11;
  }
}
