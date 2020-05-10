import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPostSingleComponent } from './app-post-single.component';

describe('AppPostSingleComponent', () => {
  let component: AppPostSingleComponent;
  let fixture: ComponentFixture<AppPostSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPostSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPostSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
