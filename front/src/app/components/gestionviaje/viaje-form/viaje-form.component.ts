import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-viaje-form',
  templateUrl: './viaje-form.component.html',
  styleUrls: ['./viaje-form.component.css']
})
export class ViajeFormComponent  {
  @Input() estacionNombre: string = '';
  @Input() zonaNombre: string = '';
  @Input() horarioTexto: string = '';
  @Input() clima: string = '';

  fechaHoy: string = new Date().toISOString().split('T')[0];
}
