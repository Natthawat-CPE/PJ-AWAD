import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { FormControl, FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  product: any;
  status_Hot?: boolean;
  status_Cold?: boolean;
  status_Frappe?: boolean;

  numberType:number[] =[];
  activePageType?:number;


  ProductForm = new FormGroup({
    Product_Name: new FormControl(''),
    Product_Detail: new FormControl(''),
    Product_Price: new FormControl(''),
    Product_Img: new FormControl(''),
  });

  previewLoaded: boolean = false;

  constructor
  (
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    // TODO cart icon
    // TODO private cartService:CartService
  ) 
  
  {
    this.getOneProduct();
  }

  ngOnInit(): void {
  }

  renameFormControl(formGroup:FormGroup, oldName:string, newName:string) {
    const oldControl = formGroup.get(oldName);
    const newControl = new FormControl(oldControl?.value);
    formGroup.removeControl(oldName);
    formGroup.addControl(newName, newControl);
}

  // TODO cart icon
  addProductToCart(){
    let product_id = this.activatedRoute.snapshot.paramMap.get('id');
    //TODO this.cartService.add(product_id!)
  }

  checkData(){
    try{
      if (this.product.Product_IsHot == true){
        this.numberType.push(1);
      }
      if (this.product.Product_IsCold == true){
        this.numberType.push(2);
      }
      if (this.product.Product_IsFrappe == true){
        this.numberType.push(3);
      }
      if (this.activePageType == undefined || this.activePageType == null ) {
        this.activePageType = this.numberType[0];
      }

      if (this.activePageType == 1) {
        this.loadData("Hot");
      } else if (this.activePageType == 2) {
        this.loadData("Cold");
      } else {
        this.loadData("Frappe");
      }

    } catch(err){
      console.log(err);
    }
  }

  setActivePageType(Type:string){
    if (Type == "Hot"){
      this.activePageType = 1;
    } else if (Type == "Cold") {
      this.activePageType = 2;
    } else {this.activePageType = 3;}
    this.checkData();
  }
  getOneProduct() {
     try{
      let product_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.productService.restOneProduct(product_id).subscribe(
        data => {
          this.product = data;
          console.log(this.product);
          this.checkData();
        },
        err => {
          console.log(err);
        }
      )
    } catch(err) {
      console.log(err);
    }
  }

  loadData(Type:string){
    if (Type == "Hot"){
      try {
      this.ProductForm.patchValue({
        Product_Name: this.product.Product_Name,
        Product_Detail: this.product.Product_Detail_Hot,
        Product_Price: this.product.Product_Price_Hot,
        Product_Img: this.product.Product_Img_Hot
      });
      } catch(err) {
        console.log(err);
      }

    } else if (Type == "Cold") {
      try{
        this.ProductForm.patchValue({
          Product_Name: this.product.Product_Name,
          Product_Detail: this.product.Product_Detail_Cold,
          Product_Price: this.product.Product_Price_Cold,
          Product_Img: this.product.Product_Img_Cold
        });
      } catch(err) {
        console.log(err);
      }

    } else if (Type == "Frappe") {
      try{
      this.ProductForm.patchValue({
        Product_Name: this.product.Product_Name,
        Product_Detail: this.product.Product_Detail_Frappe,
        Product_Price: this.product.Product_Price_Frappe,
        Product_Img: this.product.Product_Img_Frappe
      });
      } catch(err) {
        console.log(err);
      }
    }
  } 



  onChangeImg(e:any){
    if(e.target.files.length>0){
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.previewLoaded = true;
        this.ProductForm.patchValue({
          Product_Img: reader.result?.toString()
        })
      }
    }
  }

  updateProduct() {
    this.renameFromGroup();
    let product_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService. updateProduct (product_id ,this.ProductForm.value).subscribe(
       data => {
        console.log(data)
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteProduct() {
    let product_id = this.activatedRoute.snapshot.paramMap.get('id');
    this.productService.deleteProduct (product_id).subscribe(
       data => {
        console.log(data)
      },
      err => {
        console.log(err);
      }
    );
  }

  renameFromGroup(){
    if (this.activePageType == 1){
      this.renameFormControl(this.ProductForm, "Product_Detail", "Product_Detail_Hot");
      this.renameFormControl(this.ProductForm, "Product_Price", "Product_Price_Hot");
      this.renameFormControl(this.ProductForm, "Product_Img", "Product_Img_Hot");
    } else if (this.activePageType == 2) {
      this.renameFormControl(this.ProductForm, "Product_Detail", "Product_Detail_Cold");
      this.renameFormControl(this.ProductForm, "Product_Price", "Product_Price_Cold");
      this.renameFormControl(this.ProductForm, "Product_Img", "Product_Img_Cold");
    } else {
      this.renameFormControl(this.ProductForm, "Product_Detail", "Product_Detail_Frappe");
      this.renameFormControl(this.ProductForm, "Product_Price", "Product_Price_Frappe");
      this.renameFormControl(this.ProductForm, "Product_Img", "Product_Img_Frappe");
    }
  }
  
}
