import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../services/statistics.service';
import { StorageService } from '../services/storage.service';
import { ShuffleService } from '../services/shuffle.service';
import { ConfigService } from '../services/config.service';
import { ScrambleService } from '../services/scramble.service';

@Component({
  selector: 'app-game-type',
  templateUrl: './game-type.component.html',
  styleUrls: ['./game-type.component.scss']
})
export class GameTypeComponent implements OnInit {

  get tiles(){
    return this.store.tiles;
  }

  constructor(public stat: StatisticsService,
    public config: ConfigService,
    public scramble: ScrambleService,
    public shuffle: ShuffleService, 
    public store: StorageService) { }

  ngOnInit() {
  }

  recreateGrid(){
    this.endGame();
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

  startGame() {
    const pseudoShuffle = false;
    
    if (pseudoShuffle) {
      this.swapTiles(
        this.tiles[this.tiles.length - 1],
        this.tiles[this.tiles.length - 2]
      );
    } else {
      this.shuffle.array(this.tiles.map((tile) => {
        return {
          x: tile.position_x,
          y: tile.position_y
        }
      })).map((p, i) => {
        this.tiles[i].position_x = p.x;
        this.tiles[i].position_y = p.y;
      });
    }
    this.stat.startGame();
  }

  swapTiles(t1, t2) {
    [t1.position_x, t2.position_x] = [t2.position_x, t1.position_x];
    [t1.position_y, t2.position_y] = [t2.position_y, t1.position_y];
    if (this.stat.isGameRunning()) {
      this.stat.doMove();
      if (this.stat.isWin(this.tiles)) {
        this.stat.stopGame();
        const dimension = this.config.dimension;
        const gameTime = this.stat.getGameTime();
        const movesCount = this.stat.getMovesCount();
        alert('yxkvlxkvl;xou won the game..');
        /* this.modal.openWin(dimension, gameTime, movesCount).then((username) => {
          if (username) {
            this.stat.saveResult(username, dimension, gameTime, movesCount);
          }
        }); */
      }
    }
  }

  endGame() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.tiles[i].position_x = this.tiles[i].x;
      this.tiles[i].position_y = this.tiles[i].y;
    }
    
    this.stat.stopGame();
  }

}
