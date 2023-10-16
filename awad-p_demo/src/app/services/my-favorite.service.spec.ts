import { TestBed } from '@angular/core/testing';

import { MyFavoriteService } from './my-favorite.service';

describe('MyFavoriteService', () => {
  let service: MyFavoriteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyFavoriteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
