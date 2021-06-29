import { Component, OnInit, ElementRef, ViewChild, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() {
   }

  ngOnInit(): void {
  }


  dropdownMenu(input){
    console.log(input);
    let x = input;
    if (x.className === "nav-items") {
      x.className += " responsive";
    }
    else {
      x.className = "nav-items";
    }
  }
}
