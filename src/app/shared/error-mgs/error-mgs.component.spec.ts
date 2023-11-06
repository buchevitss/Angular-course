import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorMgsComponent } from './error-mgs.component';

describe('ErrorMgsComponent', () => {
  let component: ErrorMgsComponent;
  let fixture: ComponentFixture<ErrorMgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorMgsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ErrorMgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
