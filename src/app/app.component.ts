import { Component, VERSION } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

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

  difficulty = new FormControl('', Validators.required);
  grid = new FormControl('2', Validators.required);

  modes: any[] = [
    {label: 'Amature', value: 'A'},
    {label: 'Semi-Pro', value: 'S'},
    {label: 'Professional', value: 'P'},
    {label: 'Legendary', value: 'L'},
  ];

  grids: any[] = [
    {label: '2 x 2', value: '2'},
    {label: '4 x 4', value: '4'},
    {label: '6 x 6', value: '6'},
    {label: '8 x 8', value: '8'},
  ];

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(){
    this.difficulty.patchValue('A');
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
