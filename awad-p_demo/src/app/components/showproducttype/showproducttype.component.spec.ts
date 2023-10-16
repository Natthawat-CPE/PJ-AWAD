import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowproducttypeComponent } from './showproducttype.component';

describe('ShowproducttypeComponent', () => {
  let component: ShowproducttypeComponent;
  let fixture: ComponentFixture<ShowproducttypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowproducttypeComponent]
    });
    fixture = TestBed.createComponent(ShowproducttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
