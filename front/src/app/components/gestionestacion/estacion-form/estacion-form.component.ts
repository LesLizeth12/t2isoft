import { Component, OnInit, ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Estacion } from 'src/app/models/EstacionModel';

@Component({
  selector: 'app-estacion-form',
  templateUrl: './estacion-form.component.html',
  styleUrls: ['./estacion-form.component.css']
})
export class EstacionFormComponent implements OnInit{
  estacionForm!: FormGroup;
  submited = false;
  estacion: Estacion | undefined;
  isEditMode =false;

  ngOnInit(): void {
    this.estacionForm = this.fb.group({
      Id: [this.estacion?.Id],
      EstNombre: [this.estacion?.EstNombre || '', Validators.required],
      EstDescripcion: [this.estacion?.EstDescripcion || '', Validators.required],
      Estado: '1'
    })
  }


  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.estacionForm = this.fb.group({
      EstNombre: [''],
      EstDescripcion: [''],
      Estado: '1'
    })
  }


  onSubmit() {
    this.submited = true;
    if (this.estacionForm.valid) {
      this.activeModal.close(this.estacionForm.value);
      this.estacionForm.reset();
      this.submited = false;
    }
  }

  onCancel() {
    this.estacionForm.reset();
    this.submited = false;
    this.activeModal.dismiss();
  }
}
