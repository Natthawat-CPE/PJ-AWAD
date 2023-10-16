import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  admins: any

  constructor(
    private http: HttpClient,
  ) { }

  AdminSignin(adminData:any){
    return this.http.post<any>('http://localhost:3000/admins/signin', adminData)
      .pipe(map(data => {
        return data;
      }));
  }
}
