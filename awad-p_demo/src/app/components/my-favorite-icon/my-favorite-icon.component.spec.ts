import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFavoriteIconComponent } from './my-favorite-icon.component';

describe('MyFavoriteIconComponent', () => {
  let component: MyFavoriteIconComponent;
  let fixture: ComponentFixture<MyFavoriteIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFavoriteIconComponent]
    });
    fixture = TestBed.createComponent(MyFavoriteIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
