import { TestBed } from '@angular/core/testing';

import { TarsasagService } from './tarsasag.service';

describe('TarsasagService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TarsasagService = TestBed.get(TarsasagService);
    expect(service).toBeTruthy();
  });
});
