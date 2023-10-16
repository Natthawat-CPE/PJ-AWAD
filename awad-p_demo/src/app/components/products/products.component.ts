import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductTypeService } from 'src/app/services/product-type.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  List_products: any;

  searchText: string = '';

  productTypes!: any
  ptstring!: any;

  constructor (
    
    private productsService:ProductsService,
    private productTypeService: ProductTypeService,
    )
    {
      this.getAllProductTypes();
    }
  ngOnInit(): void {
    
  }

  onSearchTextEntered(seachValue: string) {
    this.searchText = seachValue;
    console.log(this.searchText);
  }

  SeachMatch(item: any): Boolean {
    if (this.searchText === '' || 
      item.Product_Name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      item.Product_Type.toLowerCase().includes(this.searchText.toLowerCase())) {
        return true
    } else return false;
  }

  ShowSeach(productType: string): Boolean {
    if ( this.List_products.find((x: { Product_Type: string; })  => x.Product_Type == productType && this.SeachMatch(x)) ) {
      return true;
    } else return false;
  }

  isCheck(bool: boolean): string {
    if(bool) {
      return "&#x2713;"
    } else return "&#x2715;"
  }

  // rest from service
  getAllProducts() {
    try{
      this.productsService.restAllProducts().subscribe(
        data => {
          this.List_products = data
        },
        err => {
          console.log(err);
        }
      );
    } catch(err) {
      console.log(err);
    }
  }

  getAllProductTypes() {
    try{
      this.productTypeService.restAllProductTypes().subscribe(
        data => {
          this.productTypes = data;
          this.getAllProducts();
        },
        err => {
          console.log(err);
        }
      );
    } catch(err) {
      console.log(err);
    }
  }

  // // rest from service
  // getAllDummy() {
  //   this.productsService.restAllProducts().subscribe({
  //     next: (response) => {
  //       this.List_products = response
  //       console.log("dummy");
  //       console.log(this.List_products);
  //     },
  //     error: (error) => {
  //       console.log(error);
  //     }
  //   });
  // }
}
