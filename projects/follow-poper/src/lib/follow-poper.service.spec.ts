import { TestBed } from '@angular/core/testing';

import { FollowPoperService } from './follow-poper.service';

describe('FollowPoperService', () => {
  let service: FollowPoperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FollowPoperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
