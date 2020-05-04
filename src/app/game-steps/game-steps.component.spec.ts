import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStepsComponent } from './game-steps.component';

describe('GameStepsComponent', () => {
  let component: GameStepsComponent;
  let fixture: ComponentFixture<GameStepsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameStepsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
