import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { MenuComponent } from './components/menu/menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './components/home/home.component';
import { SearchComponent } from './components/search/search.component';
import { ShowproducttypeComponent } from './components/showproducttype/showproducttype.component';
import { ProducttypeDetailComponent } from './components/producttype-detail/producttype-detail.component';
import { CreateproducttypeComponent } from './components/createproducttype/createproducttype.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HomeuserComponent } from './components/homeuser/homeuser.component';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';
import { UsersigninComponent } from './components/usersignin/usersignin.component';
import { UsersignupComponent } from './components/usersignup/usersignup.component';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { AdminmenuComponent } from './components/adminmenu/adminmenu.component';
import { UsermenuComponent } from './components/usermenu/usermenu.component';
import { ShowproductComponent } from './components/showproduct/showproduct.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    MenuComponent,
    HomeComponent,
    SearchComponent,
    ShowproducttypeComponent,
    ProducttypeDetailComponent,
    CreateproducttypeComponent,
    HomeuserComponent,
    HomeadminComponent,
    UsersigninComponent,
    UsersignupComponent,
    AdminsigninComponent,
    AdminmenuComponent,
    UsermenuComponent,
    ShowproductComponent,
    ProductDetailsComponent,
    CreateproductComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
