import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { StatisticsService } from './statistics.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage: any;
  tiles:any[];

  constructor(private config: ConfigService, public stat: StatisticsService) {
    let defaults = {
      dimension: 4,  // standard value for 15-puzzle
      //showNumber: true,
      //highlightRightPlace: true,
      score: [
        { "username": "Prem", "dimension": 4, "gameTime": 20, "movesCount": 10, "time": 1494096553227 }
      ]
    };
    //this.storage = localStorage.setItem('statistics', JSON.stringify(defaults));
    if(sessionStorage.getItem('gameData')){
      this.getData();
    }
   }

  getStorage() {
    return this.storage;
  }

  setData(){
    if(this.stat.gameRunning){
      let gameData = {
        dimension: this.config.dimension,
        difficulty: this.config.difficulty,
        tiles: this.tiles,
        startTime: this.stat.startingTime,
        moves: this.stat.movesCount,
        pauseTime: this.stat.endingTime,
        movesLog: this.stat.moveslog
      }
      sessionStorage.setItem('gameData', JSON.stringify(gameData));
    } else{
      sessionStorage.clear();
    }
  }

  getData(){
    let d = sessionStorage.getItem('gameData');
    if(d){
      d = JSON.parse(d);
    }
    this.config.dimension = d['dimension'];
    this.tiles = d['tiles'];
    this.stat.gameRunning = true;
    this.stat.movesCount = d['moves'];
    this.stat.startingTime = (d['startTime']);
    this.config.difficulty = (d['difficulty']);
    this.stat.moveslog = d['movesLog'];
    this.stat.startTimer(d['pauseTime']);
  }
  
  getBoardSize() {
    // check $boardSize sass variable
    return 320;
  }
}
