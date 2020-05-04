import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.scss']
})
export class GameGridComponent implements OnInit {

  @Input()
  gridVal:number = 4;

  constructor() { }

  ngOnInit() {
  }

}
