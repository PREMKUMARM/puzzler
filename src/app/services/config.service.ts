import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  showNumber:boolean = true;
  highlightRightPlace: boolean = true;
  dimension:number = 2;
  tileSize:number;
  difficulty:string = 'A';

  constructor() { }
}
