import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsComponent } from './components/products/products.component';
import { ShowproducttypeComponent } from './components/showproducttype/showproducttype.component';
import { ProducttypeDetailComponent } from './components/producttype-detail/producttype-detail.component';
import { CreateproducttypeComponent } from './components/createproducttype/createproducttype.component';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { HomeComponent } from './components/home/home.component';
import { HomeuserComponent } from './components/homeuser/homeuser.component';
import { UsersigninComponent } from './components/usersignin/usersignin.component';
import { UsersignupComponent } from './components/usersignup/usersignup.component';
import { AdminsigninComponent } from './components/adminsignin/adminsignin.component';
import { HomeadminComponent } from './components/homeadmin/homeadmin.component';
import { ShowproductComponent } from './components/showproduct/showproduct.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { MyFavoriteComponent } from './components/my-favorite/my-favorite.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: 'products/product/:id', component: ProductDetailsComponent },
  { path: 'showproducttype', component: ShowproducttypeComponent },
  { path: 'showproducttype/producttype/:id', component: ProducttypeDetailComponent },
  { path: 'showproducttype/createproducttype', component: CreateproducttypeComponent},
  { path: 'home/usersignin', component: UsersigninComponent},
  { path: 'home/usersignup', component: UsersignupComponent},
  { path: 'home/user', component: HomeuserComponent},
  { path: 'home/adminsignin', component: AdminsigninComponent},
  { path: 'home/admin', component: HomeadminComponent},
  { path: 'showproduct', component: ShowproductComponent},
  { path: 'showproduct/product/:id', component: EditProductComponent},
  { path: 'showproduct/createproduct', component: CreateproductComponent},
  { path: 'myFavorite', component: MyFavoriteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
