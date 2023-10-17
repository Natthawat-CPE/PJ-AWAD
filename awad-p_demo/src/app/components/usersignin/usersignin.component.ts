import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-usersignin',
  templateUrl: './usersignin.component.html',
  styleUrls: ['./usersignin.component.css']
})
export class UsersigninComponent implements OnInit{
  
  userData = new FormGroup({
    User_Name: new FormControl(''),
    Password: new FormControl('')
  })

  constructor(
    private userService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  UserSignin() {
    console.log("start signin");
    this.userService.UserSignin(this.userData.value).subscribe(
      data => {
        console.log(data)
        this.userData.reset();
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.result.id);
        localStorage.setItem('role', 'User');
        this.router.navigate(['/home/user']);
        console.log("code work");
        alert('Sign-In successfully !!!');
      },
      err => {
        console.log(err);
        alert('Cannot Sign-In !!!');
      }
    );
  }
}
