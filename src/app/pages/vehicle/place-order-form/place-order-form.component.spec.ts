import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceOrderFormComponent } from './place-order-form.component';

describe('PlaceOrderFormComponent', () => {
  let component: PlaceOrderFormComponent;
  let fixture: ComponentFixture<PlaceOrderFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceOrderFormComponent]
    });
    fixture = TestBed.createComponent(PlaceOrderFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
