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
}
