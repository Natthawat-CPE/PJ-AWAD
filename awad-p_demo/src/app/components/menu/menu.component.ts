import { Component, OnInit } from '@angular/core';

import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  faHouse = faHouse;
  faCartShopping = faCartShopping;
  faBars = faBars;

  public isMenuOpen: Boolean = false;
  
  ngOnInit(): void {
  }

  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }
}
