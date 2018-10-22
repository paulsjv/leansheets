import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DateService = TestBed.get(DateService);
    expect(service).toBeTruthy();
  });
});
