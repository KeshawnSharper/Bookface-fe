import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotiBarComponent } from './noti-bar.component';

describe('NotiBarComponent', () => {
  let component: NotiBarComponent;
  let fixture: ComponentFixture<NotiBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotiBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotiBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
