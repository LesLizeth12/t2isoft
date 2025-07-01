import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Area } from 'src/app/models/AreaModel';
import { Empleado } from 'src/app/models/EmpleadoModel';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit{
  empleadoForm!: FormGroup;
  submited = false;

  empleado: any={
    empAreaId:'0',
    empGenero:'0',
  }
  isEditMode =false;
  areas:Area[]=[];

  ngOnInit(): void {
    this.loadAreas();
    this.empleadoForm = this.fb.group({
      id: [this.empleado?.id],
      empDni: [this.empleado?.empDni || '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      empApePat: [this.empleado?.empApePat || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      empApeMat: [this.empleado?.empApeMat || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      empNombres: [this.empleado?.empNombres || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      empGenero: [this.empleado?.empGenero || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidGenero: true } : null
      ]],
      empCorreo: [this.empleado?.empCorreo || '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      ]],
      empAreaId: [this.empleado?.empAreaId || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidArea: true } : null
      ]],
      empContrato: ['Plazo Determinado', Validators.required],
      empFecInicio: [this.empleado?.empFecInicio || '', Validators.required],
      empFecFin: [this.empleado?.empFecFin || '', Validators.required],
      empJornada: ['Tiempo Completo', Validators.required],
      empFecNac: [this.empleado?.empFecNac || '', Validators.required],
      estado: '1'
    }, { validators: fechaInicioMenorQueFin });
  }


  constructor(private areaService: AreaService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.empleadoForm = this.fb.group({
      empDni: [''],
      empApePat: [''],
      empApeMat: [''],
      empNombres: [''],
      empGenero: [''],
      empCorreo: [''],
      empAreaId: [''],
      empContrato: [''],
      empFecInicio: [''],
      empFecFin: [''],
      empJornada: [''],
      empFecNac: [''],
      estado: '1'
    })
  }


  onSubmit() {
    this.submited = true;
    if(this.empleadoForm.valid){
      this.activeModal.close(this.empleadoForm.value);
      this.empleadoForm.reset();
      this.submited=false;
    }
  }  

  loadAreas() {
    this.areaService.getAreas().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => this.areas = response,
      (error) => console.error("error en el loading area", error)
    )
  }

  onCancel() {
    this.empleadoForm.reset();
    this.submited = false;
    this.activeModal.dismiss();
  }

  
}

function fechaInicioMenorQueFin(form: AbstractControl): { [key: string]: boolean } | null {
  const inicio = form.get('empFecInicio')?.value;
  const fin = form.get('empFecFin')?.value;

  if (inicio && fin && new Date(inicio) > new Date(fin)) {
    return { fechaInvalida: true };
  }

  return null;
}


