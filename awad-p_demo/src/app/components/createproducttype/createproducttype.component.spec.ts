import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateproducttypeComponent } from './createproducttype.component';

describe('CreateproducttypeComponent', () => {
  let component: CreateproducttypeComponent;
  let fixture: ComponentFixture<CreateproducttypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateproducttypeComponent]
    });
    fixture = TestBed.createComponent(CreateproducttypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
