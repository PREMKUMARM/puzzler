import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  startingTime: any;
  endingTime: any;
  movesCount: number;
  timerHandler: any;
  gameRunning:boolean;

  constructor(private storage: StorageService) {
    //this.$interval = $interval;
    //this.$storage = storage.getStorage();
    this.startingTime = null;
    this.movesCount = 0;
    this.timerHandler = null;
   }

  startGame() {
    this.startingTime = +new Date();
    this.endingTime = +new Date();
    //this.endingTime = 0;
    this.movesCount = 0;
    this.gameRunning = true;
    this.timerHandler = setInterval(() => {
      //this.endingTime++;
      this.endingTime = +new Date();
    }, 1000);
  }
  
  getMovesCount() {
    return this.movesCount;
  }
  
  getGameTime() {
    return Math.floor((this.endingTime - this.startingTime) / 1000);
    //return this.endingTime;
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
    this.gameRunning = false
  }
  
  saveResult(username, dimension, gameTime, movesCount) {
    const time = +new Date();
    this.storage.storage.score.push({username, dimension, gameTime, movesCount, time});
  }
}
