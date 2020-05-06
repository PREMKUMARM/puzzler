import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-game-steps',
  templateUrl: './game-steps.component.html',
  styleUrls: ['./game-steps.component.scss']
})
export class GameStepsComponent implements OnInit {

  get dataSource() {
    return this.stat.moveslog;
  }

  constructor(public stat: StatisticsService) { }
  ngOnInit() {
  }

}
