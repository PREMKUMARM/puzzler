import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-game-steps',
  templateUrl: './game-steps.component.html',
  styleUrls: ['./game-steps.component.scss']
})
export class GameStepsComponent implements OnInit {

  @ViewChild('moves', {static: false}) moves: ElementRef;

  get dataSource() {
    return this.stat.moveslog;
  }

  @Input('moved')
  set steps(value) {
    if(value){
      this.scrollToBottom();
    }
  }

  constructor(public stat: StatisticsService) { }
  ngOnInit() {
    setTimeout(()=>{
      this.scrollToBottom();
    },100);
  }

  scrollToBottom = () => {
    try {
      this.moves.nativeElement.scrollTop = this.moves.nativeElement.scrollHeight+20;
    } catch (err) {}
  }

}
