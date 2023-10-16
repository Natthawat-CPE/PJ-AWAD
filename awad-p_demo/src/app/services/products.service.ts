import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products: any
  product: any

  token = localStorage.getItem('token');
  role = localStorage.getItem('role');
  headers = new HttpHeaders({
    'Authorization': `${this.token}`,
  }).append('User-Role', `${this.role}`);

  constructor(
    private http: HttpClient,
  ) {}

  restAllProducts() {
    return this.http.get<any>('http://localhost:3000/products/get', { headers: this.headers })
      .pipe(map(data => {
        if(data) {
          this.products = data;
        }
        return this.products;
      }));
  }

  restOneProduct(product_id: any) {
    return this.http.get<any>(`http://localhost:3000/products/get/${product_id}`, { headers: this.headers })
      .pipe(map(data => {
        if(data) {
          this.product = data;
        }
        return this.product;
      }));
  }

  createProduct(productData:any){
    return this.http.post<any>('http://localhost:3000/products/create', productData, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }

  updateProduct(product_id: any, productData: any) {
    return this.http.patch<any>(`http://localhost:3000/products/patch/${product_id}`, productData, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }

  deleteProduct(product_id: any) {
    return this.http.delete<any>(`http://localhost:3000/products/delete/${product_id}`, { headers: this.headers })
      .pipe(map(data => {
        return data;
      }));
  }

}
