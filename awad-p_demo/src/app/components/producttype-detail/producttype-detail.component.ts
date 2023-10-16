import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-producttype-detail',
  templateUrl: './producttype-detail.component.html',
  styleUrls: ['./producttype-detail.component.css']
})
export class ProducttypeDetailComponent implements OnInit{

  productType: any;

  productTypeData = new FormGroup({
    ProductType_Name: new FormControl('')
  })

  constructor(
    private productTypeService: ProductTypeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.getOneProductType();
  }

  ngOnInit(): void {
  }

  getOneProductType() {
    try{
      let product_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.productTypeService.restOneProductType(product_id).subscribe(
        data => {
          this.productType = data;
          this.productTypeData.controls.ProductType_Name.setValue(this.productType.ProductType_Name.toString());
        },
        err => {
          console.log(err);
        }
      )
    } catch(err) {
      console.log(err);
    }
  }

  updateProductType() {
    let product_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productTypeService.updateProductType(product_id, this.productTypeData.value).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/showproducttype']);
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteProductType() {
    try{
      let product_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.productTypeService.deleteProductType(product_id).subscribe(
        data => {
          console.log(data)
          this.router.navigate(['/showproducttype']);

        },
        err => {
          console.log(err);
        }
      )
    } catch(err) {
      console.log(err);
    }
  }
}
