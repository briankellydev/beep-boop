import { TestBed } from '@angular/core/testing';

import { SynthService } from './synth.service';

describe('SynthService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SynthService = TestBed.get(SynthService);
    expect(service).toBeTruthy();
  });
});
