import { Component, OnInit } from '@angular/core';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createproducttype',
  templateUrl: './createproducttype.component.html',
  styleUrls: ['./createproducttype.component.css']
})
export class CreateproducttypeComponent implements OnInit{

  productTypeData = new FormGroup({
    ProductType_Name: new FormControl('', [Validators.required])
  })

  constructor(
    private productTypeService: ProductTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  createProductType() {
    this.productTypeService.createProductType(this.productTypeData.value).subscribe(
      data => {
        console.log(data)
        this.router.navigate(['/showproducttype']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
