import { TestBed } from '@angular/core/testing';

import { ScrambleService } from './scramble.service';

describe('ScrambleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScrambleService = TestBed.get(ScrambleService);
    expect(service).toBeTruthy();
  });
});
