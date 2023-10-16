import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducttypeDetailComponent } from './producttype-detail.component';

describe('ProducttypeDetailComponent', () => {
  let component: ProducttypeDetailComponent;
  let fixture: ComponentFixture<ProducttypeDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProducttypeDetailComponent]
    });
    fixture = TestBed.createComponent(ProducttypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
