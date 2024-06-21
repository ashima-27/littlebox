import { TestBed } from '@angular/core/testing';

import { WcatService } from './wcat.service';

describe('WcatService', () => {
  let service: WcatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WcatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
