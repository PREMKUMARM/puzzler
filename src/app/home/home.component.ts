import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnDestroy {

  step:number = 0;

  constructor() { }

  ngOnDestroy() {
    this.step = 0;
  }

  scrollTable(){
    this.step++;
  }

}
