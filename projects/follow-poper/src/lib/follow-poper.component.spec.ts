import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowPoperComponent } from './follow-poper.component';

describe('FollowPoperComponent', () => {
  let component: FollowPoperComponent;
  let fixture: ComponentFixture<FollowPoperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FollowPoperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FollowPoperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
