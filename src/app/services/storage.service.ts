import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  storage: any;
  tiles:any[];

  constructor(private config: ConfigService) {
    let defaults = {
      dimension: 4,  // standard value for 15-puzzle
      showNumber: true,
      highlightRightPlace: true,
      score: [
        // predefined results
        { "username": "Prem", "dimension": 4, "gameTime": 20, "movesCount": 10, "time": 1494096553227 }
      ]
    };
    this.storage = localStorage.setItem('statistics', JSON.stringify(defaults));
   }

  getStorage() {
    return this.storage;
  }

  setData(){
    sessionStorage.setItem('gridData', JSON.stringify(this.config.dimension));
  }

  getData(){
    let d = sessionStorage.getItem('gridData');
    this.config.dimension = JSON.parse(d);
  }
  
  getBoardSize() {
    // check $boardSize sass variable
    return 480;
  }
}
