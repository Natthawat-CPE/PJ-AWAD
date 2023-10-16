import { Component, OnInit } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminmenu',
  templateUrl: './adminmenu.component.html',
  styleUrls: ['./adminmenu.component.css']
})
export class AdminmenuComponent implements OnInit{
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
