import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { FormControl, FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit{
  products = new FormGroup({
    Product_Name: new FormControl('',[Validators.required]),
    Product_Type: new FormControl('', [Validators.required]),
    Product_IsHot: new FormControl('', [Validators.required]),
    Product_IsCold: new FormControl('', [Validators.required]),
    Product_IsFrappe: new FormControl('', [Validators.required]),
    Product_Detail_Hot: new FormControl('', [Validators.required]),
    Product_Detail_Cold: new FormControl('', [Validators.required]),
    Product_Detail_Frappe: new FormControl('', [Validators.required]),
    Product_Price_Hot: new FormControl('', [Validators.required]),
    Product_Price_Cold: new FormControl('', [Validators.required]),
    Product_Price_Frappe: new FormControl('', [Validators.required]),
    Product_Img_Hot: new FormControl('', [Validators.required]), 
    Product_Img_Cold: new FormControl('', [Validators.required]), 
    Product_Img_Frappe: new FormControl('', [Validators.required]), 
  })

  previewLoaded: boolean = false;
  productTypes: any;
  showhot: boolean = false;
  showcold: boolean = false;
  showfrappe: boolean = false;
  

  constructor(
    private productsService: ProductsService,
    private productTypeService: ProductTypeService
  ) {

  }

  ngOnInit(): void {
    this.getAllProductTypes();
  }

  onChangeImg(e:any){
    const file = e.target.files[0];
    if (file == 'X') {
      return
    }
    var pattern = /image-*/;
    const reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      this.products.reset();
    } 
    else { 
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.products.patchValue({
          Product_Img_Hot: reader.result?.toString(),
          Product_Img_Cold: reader.result?.toString(),
          Product_Img_Frappe: reader.result?.toString()
        })
      }
    }
}

  createProduct() {
    console.log(this.products.value)
    console.log(typeof this.products.controls.Product_Price_Hot.value)
    if (Number(this.products.controls.Product_Price_Hot.value) < 0 || Number(this.products.controls.Product_Price_Cold.value) < 0 || Number(this.products.controls.Product_Price_Frappe.value) < 0) {
      alert("Price can't be negative")
      return
    }
    
    this.productsService.createProduct(this.products.value).subscribe(
      data => {
        console.log(data)
        this.products.reset();
        this.previewLoaded = false;
      },
      err => {
        alert("Input is invalid");
        console.log(err);
      }
    );
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

  onClickHot(value : boolean){
    if (value === true) {
      this.showhot = value;
    } else {
      this.products.controls.Product_Detail_Hot.setValue('None');
      this.products.controls.Product_Price_Hot.setValue('0');
      this.products.controls.Product_Img_Hot.setValue('None');
    }
  }

  onClickCold(value : boolean){
    if (value === true) {
      this.showcold = value;
    } else {
      this.products.controls.Product_Detail_Cold.setValue('None');
      this.products.controls.Product_Price_Cold.setValue('0');
      this.products.controls.Product_Img_Cold.setValue('None');
    }
  }

  onClickFrappe(value : boolean){
    if (value === true) {
      this.showfrappe = value;
    } else {
      this.products.controls.Product_Detail_Frappe.setValue('None');
      this.products.controls.Product_Price_Frappe.setValue('0');
      this.products.controls.Product_Img_Frappe.setValue('None');
    }
  }

  nonNegativeNumberValidator(control: FormControl) {
    const value = control.value;
  
    if (value === null || value === undefined || value < 0) {
      return { nonNegative: true };
    }
  
    return null;
  }

  testProductType() {
    this.getAllProductTypes();
    console.log(this.productTypes)
  }

}
