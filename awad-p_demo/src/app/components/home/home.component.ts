import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  checkit: boolean = true;
  productTypes!: any

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    localStorage.clear();
  }

  isCheck(bool: boolean): string {
    if (bool) {
      return "&#x2716;"
    } else return "";
  }

  MySymbol(): string {
    return "&#x2716;";
  }
}
