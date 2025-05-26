import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceConstructorComponent } from './service-constructor.component';

describe('ServiceConstructorComponent', () => {
  let component: ServiceConstructorComponent;
  let fixture: ComponentFixture<ServiceConstructorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceConstructorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
