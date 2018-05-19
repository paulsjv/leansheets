import { TestBed, inject } from '@angular/core/testing';

import { 64014Service } from './64014.service';

describe('64014Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [64014Service]
    });
  });

  it('should be created', inject([64014Service], (service: 64014Service) => {
    expect(service).toBeTruthy();
  }));
});
