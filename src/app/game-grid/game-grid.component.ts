import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConfigService } from '../services/config.service';
import { ScrambleService } from '../services/scramble.service';
import { ShuffleService } from '../services/shuffle.service';
import { StatisticsService } from '../services/statistics.service';
import { StorageService } from '../services/storage.service';
import { AlertDialogComponent } from '../alert-dialog/alert-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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

  @Output()
  stepMoved = new EventEmitter<any>();

  constructor(public scramble: ScrambleService, 
    public config: ConfigService,
    private dialog: MatDialog,
    public stat: StatisticsService,
    public storage: StorageService,
    public shuffle: ShuffleService) {
   }

  ngOnInit() {
    this.config.tileSize = Math.floor(this.storage.getBoardSize() / this.config.dimension);
    if(!this.stat.gameRunning){
      this.scramble.getTiles().then((tilesArr:any[])=>{
        this.storage.tiles = tilesArr.map((tile) => {
          tile.position_x = tile.x;
          tile.position_y = tile.y;
          //console.log(tile);
          return tile;
        });
        //console.log(tilesArr[0]);
      });
    }
  }

  getTilePosition(tile){
    
    return `translate3d(${tile.position_x * this.config.tileSize}px, ${tile.position_y * this.config.tileSize}px, 0px)`;
  }

  getMargin(tile){
    if(tile.position_y > 0 || tile.position_x > 0){
      return '0px';
    }
  }

 

  swapTiles(t1, t2) {
    [t1.position_x, t2.position_x] = [t2.position_x, t1.position_x];
    [t1.position_y, t2.position_y] = [t2.position_y, t1.position_y];
    console.debug('Before::',t1, t2);
    let m = {
      tile: 'Tile '+t2.num,
      before: [t1.position_y, t2.position_y],
      after: [t1.position_x, t2.position_x]
    }
    this.stat.moveslog.push(m);
    this.stepMoved.emit();
    if (this.stat.isGameRunning()) {
      this.stat.doMove();
      if (this.stat.isWin(this.tiles)) {
        this.stat.stopGame();
        this.openAlertDialog();
      }
    }
  }


  openAlertDialog() {
    const dialogRef = this.dialog.open(AlertDialogComponent,{
      data:{
        message: 'You won the game in '+this.stat.getMovesCount()+ ' moves',
        buttonText: {
          cancel: 'Done'
        }
      },
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      //this.stat.stopGame();
    });
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
