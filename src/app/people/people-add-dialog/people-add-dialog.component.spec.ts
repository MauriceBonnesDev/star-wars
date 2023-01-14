import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleAddDialogComponent } from './people-add-dialog.component';

describe('PeopleAddDialogComponent', () => {
  let component: PeopleAddDialogComponent;
  let fixture: ComponentFixture<PeopleAddDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeopleAddDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeopleAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
