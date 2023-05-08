import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http:HttpClient) { }

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

  saveUserDate(token:any, user:any) {
    localStorage.setItem("authToken", token);
    localStorage.setItem("nameUser", (user));
  }

  isLoggedIn() :boolean {
    //TODO: Enhace this method. angular2-jwt
    //to verifey if the token in expired
    return !!localStorage.getItem("authToken");
  }

  logOut() {
    //localStorage.removeItem("authToken");
    //localStorage.removeItem("nameUser");
    localStorage.clear();
  }

  getLoggedInUser() {
    if (this.isLoggedIn()) {
      const user = {
        authToken: localStorage.getItem("authToken"),
        nameUser: localStorage.getItem("nameUser")
      };
      return user;
    }
    return null;
  }

}
