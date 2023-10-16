import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MyFavoriteService {

  myFavorite:any;
  allFavorite:any;
  thisFavorite:any;

  token = localStorage.getItem('token');
  role = localStorage.getItem('role');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`,
  });


  

  constructor(private http: HttpClient) { 

  }

  // * GET *

  //! GET All 
  restAllmyFavorite() {
    return this.http.get<any>('http://localhost:3000/myfavorites/get', { headers: this.headers })
      .pipe(map(data => {
        if(data) {
          this.allFavorite = data;
        }
        // return this.allFavorite;
      }));
  }

  // TODO GET All by U_id
  restAllByu_idmyFavorite(u_id:any) {
    return this.http.get<any>(`http://localhost:3000/myfavorites/get/uid/${u_id}`, { headers: this.headers })
      .pipe(map(data => {
        if(data) {
          this.myFavorite = data;
        }
        return this.myFavorite;
      }));
  }

  // TODO GET One by Favorite_ID
  restOneByf_idmyFavorite(f_id:any) {
    return this.http.get<any>(`http://localhost:3000/myfavorites/get/${f_id}`, { headers: this.headers })
      .pipe(map(data => {
        if(data) {
          this.thisFavorite = data;
        }
        return this.thisFavorite;
      }));
  }


  // * POST *

  // TODO POST Favorite
  createMyFavorite(Favorite:any){
    return this.http.post<any>('http://localhost:3000/myfavorites/create', Favorite, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }

  // * PATCH *

  // TODO UPDATE One Favorite by Favorite_ID
  updateOneFavorite(f_id: any, setFavorite: any) {
    return this.http.patch<any>(`http://localhost:3000/myfavorites/patch/${f_id}`, setFavorite, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }


  // * DELETE *

  // TODO DELETE One by F_id
  deleteOneFavoriteByF_id (thisFavorite: any) {
    return this.http.delete<any>(`http://localhost:3000/myfavorites/delete/${thisFavorite}`, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }
  // TODO DELETE One by P_name & P_Price
  deleteOneFavoriteByF_name(Favorite:any) {
    return this.http.delete<any>(`http://localhost:3000/myfavorites/delete/favorite`, { headers: this.headers, body: Favorite })
      .pipe(map(data => {
        return data;
      }));
  }




}
