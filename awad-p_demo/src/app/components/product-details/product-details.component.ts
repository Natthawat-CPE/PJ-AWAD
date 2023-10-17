import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { MyFavoriteService } from 'src/app/services/my-favorite.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { faL } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit{

  product: any;

  hot_button = 'https://www.cafe-amazon.com/images/products_icon_hot.png';
  cold_button = 'https://www.cafe-amazon.com/images/products_icon_cool.png';
  frappe_button = 'https://www.cafe-amazon.com/images/products_icon_smooty.png';

  hot_button_selected = 'https://www.cafe-amazon.com/images/products_icon_hot_hover.png';
  cold_button_selected = 'https://www.cafe-amazon.com/images/products_icon_cool_hover.png';
  frappe_button_selected = 'https://www.cafe-amazon.com/images/products_icon_smooty_hover.png';

  updated_hot_button!: string;
  updated_cold_button!: string;
  updated_frappe_button!: string;

  updated_hot_button_selected!: boolean;
  updated_cold_button_selected!: boolean;
  updated_frappe_button_selected!: boolean;

  current_Img!: string;
  current_Detail!: string;
  current_Price!: number;



  statusMyFavorite!:boolean;

  constructor
  (
    private productService: ProductsService,
    private activatedRoute: ActivatedRoute,
    private myFavoriteService: MyFavoriteService
  ) 
  
  {
    this.getOneProduct();
    // this.loadDataFavorite();
  }

  ngOnInit(): void {
  }

  loadDataFavorite(){
    let myFavorite:any;
    let user_id = localStorage.getItem('userId');
    let product_id = this.activatedRoute.snapshot.paramMap.get('id');

    let prefix:string;
      if (this.updated_hot_button_selected == true) {
        prefix = "(ร้อน)";
      } else if (this.updated_cold_button_selected == true) {
        prefix = "(เย็น)";
      } else {
        prefix = "(ปั่น)";
      }

    this.myFavoriteService.restAllByu_idmyFavorite(user_id).subscribe(
      data => {
        myFavorite = data;
        console.log(myFavorite);

        // *
        const result_P_Id = myFavorite.some((Object:any) => {
          return Object.P_Id == product_id;
        });
    
        const result_P_Prefix = myFavorite.some((Object:any) => {
          return Object.P_Prefix == prefix;
        });


        if (result_P_Id && result_P_Prefix) {
          this.statusMyFavorite = true;
          console.log('พบข้อมูล:');
         } else {
          this.statusMyFavorite = false;
          console.log('ไม่พบข้อมูลที่ตรงเงื่อนไข');
         }

        // *
        // const P_Prefix = prefix;
        // const P_Id = product_id;

        // const foundItem = myFavorite.find((item:any) => {item.P_Prefix === P_Prefix && item.P_Id === P_Id});

        // if (foundItem) {
        //   // พบข้อมูลที่ตรงเงื่อนไข
        //   console.log('พบข้อมูล:', foundItem);
        //   this.statusMyFavorite = true;
        // } else {
        //   // ไม่พบข้อมูลที่ตรงเงื่อนไข
        //   console.log('ไม่พบข้อมูลที่ตรงเงื่อนไข');
        //   this.statusMyFavorite = false;
        // }

        // *
        // if (myFavorite.includes({'P_Id':product_id, 'P_Prefix':prefix})) {
        //   this.statusMyFavorite = true;
        //   console.log('พบข้อมูล:');
        // } else {
        //   console.log('ไม่พบข้อมูลที่ตรงเงื่อนไข');
        //     this.statusMyFavorite = false;
        // }
          
          },
          err => {
            console.log(err);
          }
    );


  }

  getOneProduct() {
    try{
      let product_id = this.activatedRoute.snapshot.paramMap.get('id');
      this.productService.restOneProduct(product_id).subscribe(
        data => {
          this.product = data;
          console.log(this.product)
          this.setDefaultDetail(this.product);
          this.loadDataFavorite();
        },
        err => {
          console.log(err);
        }
      )
    } catch(err) {
      console.log(err);
    }
  }

  setDefaultDetail(product: any) {
    // console.log(product.Product_IsHot);
    if (product.Product_IsHot) {
      console.log("really hot")
      this.setDetailHot(product);
    } else if (product.Product_IsCold) {
      console.log("really cold")
      this.setDetailCold(product);
    } else if (product.Product_IsFrappe) {
      console.log("really frappe")
      this.setDetailFrappe(product);
    }
  }

  setDetailHot(product: any) {
    this.loadDataFavorite();
    this.current_Detail = product.Product_Detail_Hot;
    this.current_Img = product.Product_Img_Hot;
    this.current_Price = product.Product_Price_Hot;

    this.updated_hot_button_selected = true;
    this.updated_cold_button_selected = false;
    this.updated_frappe_button_selected = false;

    this.updateButton(this.updated_hot_button_selected, this.updated_cold_button_selected, this.updated_frappe_button_selected);
  }

  setDetailCold(product: any) {
    this.loadDataFavorite();
    this.current_Detail = product.Product_Detail_Cold;
    this.current_Img = product.Product_Img_Cold;
    this.current_Price = product.Product_Price_Cold;

    this.updated_hot_button_selected = false;
    this.updated_cold_button_selected = true;
    this.updated_frappe_button_selected = false;

    this.updateButton(this.updated_hot_button_selected, this.updated_cold_button_selected, this.updated_frappe_button_selected);
  }

  setDetailFrappe(product: any) {
    this.loadDataFavorite();
    console.log("click frappe")
    this.current_Detail = product.Product_Detail_Frappe;
    this.current_Img = product.Product_Img_Frappe;
    this.current_Price = product.Product_Price_Frappe;

    this.updated_hot_button_selected = false;
    this.updated_cold_button_selected = false;
    this.updated_frappe_button_selected = true;

    this.updateButton(this.updated_hot_button_selected, this.updated_cold_button_selected, this.updated_frappe_button_selected);
  }

  updateButton(hot: boolean, cold: boolean, frappe: boolean) {
    hot? this.updated_hot_button = this.hot_button_selected : this.updated_hot_button = this.hot_button;
    cold? this.updated_cold_button = this.cold_button_selected : this.updated_cold_button = this.cold_button;
    frappe? this.updated_frappe_button = this.frappe_button_selected : this.updated_frappe_button = this.frappe_button;
    
  }

  

  changFavorite(){
    this.statusMyFavorite = !this.statusMyFavorite;
    // TODO POST , DELETE this Favorite Product
    // POST
    let prefix:string;
      if (this.updated_hot_button_selected == true) {
        prefix = "(ร้อน)";
      } else if (this.updated_cold_button_selected == true) {
        prefix = "(เย็น)";
      } else {
        prefix = "(ปั่น)";
      }

    let user_id = localStorage.getItem('userId');
    let product_id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.statusMyFavorite == true){
      
      const saveData = new FormGroup({
        P_Id: new FormControl(product_id),
        P_Name: new FormControl(this.product.Product_Name),
        P_Prefix: new FormControl(prefix),
        U_Id: new FormControl(user_id),
      })
      console.log(saveData);

      this.myFavoriteService.createMyFavorite(saveData.value).subscribe(        
      data => {
        console.log(data)
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );

    } else {

      const deleteData = new FormGroup({
        P_Id: new FormControl(product_id),
        P_Prefix: new FormControl(prefix),
        U_Id: new FormControl(user_id),
      })

      console.log(deleteData);

      this.myFavoriteService.deleteOneFavoriteByF_name(deleteData.value).subscribe(
        data => {
          console.log('Deleted Success !!!');
          window.location.reload();
        },
        err => {
          console.log(err);
        }
      );

    }
  }

}
