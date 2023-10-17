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
    this.pullMyFavorite();

  }

  pullMyFavorite(){
    let user_id = localStorage.getItem('userId');
    this.myFavoriteService.restAllByu_idmyFavorite(user_id).subscribe(
      data => {
        this.myFavorite = data;
        return data;
      },
      err => {
        console.log(err);
      }
    );

  }

  deleteMyFavorite(index:number){
    let f_id = this.myFavorite[index];
    this.myFavoriteService.deleteOneFavoriteByF_id(f_id._id).subscribe(
      data => {
        console.log("Deleted 1 Row of My Favorite !!!")
        this.pullMyFavorite();
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    );

  }



}
