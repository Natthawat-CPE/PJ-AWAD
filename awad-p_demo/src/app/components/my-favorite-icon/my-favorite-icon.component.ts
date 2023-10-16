import { Component, OnInit,DoCheck } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyFavoriteService } from 'src/app/services/my-favorite.service';

@Component({
  selector: 'app-my-favorite-icon',
  templateUrl: './my-favorite-icon.component.html',
  styleUrls: ['./my-favorite-icon.component.css']
})
export class MyFavoriteIconComponent {
  counter:number = 0;
  myFavorite: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private myFavoriteService: MyFavoriteService
  ){
    this.pullCounter();
  }

  // add(p_id:string){
  //   console.log('Add product id: '+p_id+' to cart');
  //   this.counter +=1;
  // }

  pullCounter(){
    let user_id = localStorage.getItem('userId');
    this.myFavoriteService.restAllByu_idmyFavorite(user_id).subscribe(
      data => {
        this.myFavorite = data;
      },
      err => {
        console.log(err);
      }
    );

  }

  getCounter(){
    return this.myFavorite.length;
  }


}
