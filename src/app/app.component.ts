import { Component, VERSION, HostListener } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConfigService } from './services/config.service';
import { StorageService } from './services/storage.service';
import { ShuffleService } from './services/shuffle.service';
import { StatisticsService } from './services/statistics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  mobileQuery: MediaQueryList;
  rendered:boolean;
  title = 'puzzler';
  version = VERSION;

  private _mobileQueryListener: () => void;

  difficulty = new FormControl('');
  grid = new FormControl(null, Validators.required);

  modes: any[] = [
    {label: 'Amature', value: 'A'},
    {label: 'Semi-Pro', value: 'S'},
    {label: 'Professional', value: 'P'},
    {label: 'Legendary', value: 'L'},
  ];

  grids: any[] = [
    {label: '2 x 2', value: 2},
    {label: '4 x 4', value: 4},
    {label: '6 x 6', value: 6},
    {label: '8 x 8', value: 8},
  ];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    public storage: StorageService,
    public stat: StatisticsService,
    public shuffle: ShuffleService,
    public config: ConfigService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(){
    this.difficulty.patchValue('A');
    this.grid.patchValue(this.config.dimension);

  }

  applySettings(){
    this.config.dimension = this.grid.value;
    this.shuffle.shuffleGrid();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  @HostListener('window:beforeunload')
  saveUserData() {
    this.storage.setData();
  }
}
