import { Injectable } from '@angular/core';
//import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  startingTime: any;
  endingTime: any;
  movesCount: number;
  timerHandler: any;
  gameRunning:boolean;

  constructor() {
    this.startingTime = null;
    this.movesCount = 0;
    this.timerHandler = null;
   }

  startGame() {
    this.startingTime = Date.now();
    this.endingTime = Date.now();
    this.movesCount = 0;
    this.gameRunning = true;
    this.startTimer();
  }

  startTimer(pauseTime?){
    this.timerHandler = setInterval(() => {
      this.endingTime = Date.now() ;
    }, 1000);
  }
  
  getMovesCount() {
    return this.movesCount;
  }
  
  getGameTime() {
    return (this.endingTime - this.startingTime);
  }
  
  isGameRunning() {
    return this.gameRunning;
  }
  
  doMove() {
    this.movesCount++;
  }
  
  isWin(tiles) {
    const len = tiles.length;
    for (let i = 0; i < len; i++) {
      if (tiles[i].x !== tiles[i].position_x) {
        return false;
      }
      if (tiles[i].y !== tiles[i].position_y) {
        return false;
      }
    }
    return true;
  }
  
  stopGame() {
   // this.$interval.cancel(this.timerHandler);
    clearInterval(this.timerHandler);
    this.gameRunning = false;
    sessionStorage.clear();
  }
  
  saveResult(username, dimension, gameTime, movesCount) {
    const time = +new Date();
  //  this.storage.storage.score.push({username, dimension, gameTime, movesCount, time});
  }
}
