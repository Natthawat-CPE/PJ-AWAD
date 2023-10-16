import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users: any

  constructor(
    private http: HttpClient,
  ) { }

  createUser(userData:any){
    return this.http.post<any>('http://localhost:3000/users/signup', userData)
      .pipe(map(data => {
        return data;
      }));
  }

  UserSignin(userData:any){
    return this.http.post<any>('http://localhost:3000/users/signin', userData)
      .pipe(map(data => {
        return data;
      }));
  }
}
