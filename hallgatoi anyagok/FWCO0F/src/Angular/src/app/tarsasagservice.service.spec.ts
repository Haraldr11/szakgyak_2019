import { TestBed } from '@angular/core/testing';

import { TarsasagserviceService } from './tarsasagservice.service';

describe('TarsasagserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TarsasagserviceService = TestBed.get(TarsasagserviceService);
    expect(service).toBeTruthy();
  });
});
