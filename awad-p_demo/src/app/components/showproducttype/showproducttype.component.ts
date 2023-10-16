import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from 'src/app/services/product-type.service';

@Component({
  selector: 'app-showproducttype',
  templateUrl: './showproducttype.component.html',
  styleUrls: ['./showproducttype.component.css']
})
export class ShowproducttypeComponent implements OnInit{

  productTypes!: any

  constructor(
    private productTypeService: ProductTypeService
  ) {
    this.getAllProductTypes();
  }

  ngOnInit(): void {
  }

  getAllProductTypes() {
    try{
      this.productTypeService.restAllProductTypes().subscribe(
        data => {
          this.productTypes = data;
        },
        err => {
          console.log(err);
        }
      );
    } catch(err) {
      console.log(err);
    }
  }

}
