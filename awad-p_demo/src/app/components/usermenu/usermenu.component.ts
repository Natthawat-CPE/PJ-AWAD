import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usermenu',
  templateUrl: './usermenu.component.html',
  styleUrls: ['./usermenu.component.css']
})
export class UsermenuComponent implements OnInit{
  faBars = faBars;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
      
  }

  SignOut() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
