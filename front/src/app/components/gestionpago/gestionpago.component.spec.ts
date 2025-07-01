import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionpagoComponent } from './gestionpago.component';

describe('GestionpagoComponent', () => {
  let component: GestionpagoComponent;
  let fixture: ComponentFixture<GestionpagoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionpagoComponent]
    });
    fixture = TestBed.createComponent(GestionpagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
