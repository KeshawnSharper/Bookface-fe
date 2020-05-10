import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsComComponent } from './posts-com.component';

describe('PostsComComponent', () => {
  let component: PostsComComponent;
  let fixture: ComponentFixture<PostsComComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostsComComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsComComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
