import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyFavoriteService } from 'src/app/services/my-favorite.service';

@Component({
  selector: 'app-my-favorite',
  templateUrl: './my-favorite.component.html',
  styleUrls: ['./my-favorite.component.css']
})
export class MyFavoriteComponent {

  myFavorite: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private myFavoriteService: MyFavoriteService
  ){
    this.pullCounter();
  }

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



}
