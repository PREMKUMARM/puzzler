import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { StorageService } from './storage.service';
import { ScrambleService } from './scramble.service';

@Injectable()
export class ShuffleService {

  constructor(private config: ConfigService, private store: StorageService, private scramble: ScrambleService) { }

  array(arr) {
    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    const shuffleArray = (a) => {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
    };
    return shuffleArray(arr);
  }

  shuffleGrid(){
    //this.endGame();
    this.config.tileSize = Math.floor(this.store.getBoardSize() / this.config.dimension);
    this.scramble.getTiles().then((tilesArr:any[])=>{
      this.store.tiles = tilesArr.map((tile) => {
        tile.position_x = tile.x;
        tile.position_y = tile.y;
        return tile;
      });
      console.log(tilesArr[0]);
    });
  }
}
