import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactTopicSelectorComponent } from './contact-topic-selector.component';

describe('ContactTopicSelectorComponent', () => {
  let component: ContactTopicSelectorComponent;
  let fixture: ComponentFixture<ContactTopicSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactTopicSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactTopicSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
