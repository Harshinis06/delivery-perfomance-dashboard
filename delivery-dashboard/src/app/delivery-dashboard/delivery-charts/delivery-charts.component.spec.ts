import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryChartsComponent } from './delivery-charts.component';

describe('DeliveryChartsComponent', () => {
  let component: DeliveryChartsComponent;
  let fixture: ComponentFixture<DeliveryChartsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryChartsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeliveryChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
