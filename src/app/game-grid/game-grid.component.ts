import { Component, OnInit, Input } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ScrambleService } from '../services/scramble.service';
import { ShuffleService } from '../services/shuffle.service';
import { StatisticsService } from '../services/statistics.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.scss']
})
export class GameGridComponent implements OnInit {

  get tiles(){
    return this.storage.tiles;
  }
  tileSize:number = 120;

  @Input()
  gridVal:number = 4;

  constructor(public scramble: ScrambleService, 
    private config: ConfigService,
    private stat: StatisticsService,
    private storage: StorageService,
    public shuffle: ShuffleService) {
   }

  ngOnInit() {
    this.config.tileSize = Math.floor(this.storage.getBoardSize() / this.config.dimension);
    this.scramble.getTiles().then((tilesArr:any[])=>{
      this.storage.tiles = tilesArr.map((tile) => {
        tile.position_x = tile.x;
        tile.position_y = tile.y;
        return tile;
      });
      console.log(tilesArr[0]);
    });
  }

  getTilePosition(tile){
    return `translate3d(${tile.position_x * this.config.tileSize}px, ${tile.position_y * this.config.tileSize}px, 0px)`;
  }

 

  swapTiles(t1, t2) {
    console.log(t1,t2);
    [t1.position_x, t2.position_x] = [t2.position_x, t1.position_x];
    [t1.position_y, t2.position_y] = [t2.position_y, t1.position_y];
    if (this.stat.isGameRunning()) {
      this.stat.doMove();
      if (this.stat.isWin(this.tiles)) {
        this.stat.stopGame();
        const dimension = this.config.dimension;
        const gameTime = this.stat.getGameTime();
        const movesCount = this.stat.getMovesCount();
        alert('you won the game..');
        /* this.modal.openWin(dimension, gameTime, movesCount).then((username) => {
          if (username) {
            this.stat.saveResult(username, dimension, gameTime, movesCount);
          }
        }); */
      }
    }
  }

  moveByClick(tile) {
    if (!this.stat.isGameRunning()) {
      return;
    }
    
    let emptyBlock = this.storage.tiles.find((tile) => tile.canvas === null);
    if (emptyBlock) {
      const XDistance = emptyBlock.position_x - tile.position_x;
      const YDistance = emptyBlock.position_y - tile.position_y;
      const XAllowMove = (XDistance === 0 && Math.abs(YDistance) === 1);
      const YAllowMove = (YDistance === 0 && Math.abs(XDistance) === 1);
      
      if (XAllowMove || YAllowMove) {
        this.swapTiles(emptyBlock, tile);
      }
    }
  }


}
