import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
      
  }

  enteredSearchValue: string = '';

  @Output() seachTextChanged: EventEmitter<string> = new EventEmitter<string>();

  onSeachTextChanged() {
    this.seachTextChanged.emit(this.enteredSearchValue);
  }
}
