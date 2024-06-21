import { TestBed } from '@angular/core/testing';

import { SubcatService } from './subcat.service';

describe('SubcatService', () => {
  let service: SubcatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubcatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
