import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Estacion } from 'src/app/models/EstacionModel';
import { EstacionService } from 'src/app/services/estacion.service';

@Component({
  selector: 'app-horario-form',
  templateUrl: './horario-form.component.html',
  styleUrls: ['./horario-form.component.css']
})
export class HorarioFormComponent implements OnInit{
  horarioForm!: FormGroup;
  submited = false;

  horario: any={
    horEstId:'0',
  }
  isEditMode =false;
  estacions:Estacion[]=[];

  ngOnInit(): void {
    this.loadEstacions();
    this.horarioForm = this.fb.group({
      id: [this.horario?.id],
      horEstId: [this.horario?.horEstId || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidEstacion: true } : null
      ]],
      horLlegada: [this.horario?.horLlegada || '', Validators.required],
      horSalida: [this.horario?.horSalida || '', Validators.required],
      horPrecio: [this.horario?.horPrecio || '', Validators.required],
      horDurac: [this.horario?.horDurac || '', Validators.required],
      estado: '1'
    });
  }


  constructor(private estacionService: EstacionService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.horarioForm = this.fb.group({
      horEstId: [''],
      horLlegada: [''],
      horSalida: [''],
      horPrecio: [''],
      horDurac: [''],
      estado: '1'
    })
  }


  onSubmit() {
    this.submited = true;
    if(this.horarioForm.valid){
      this.activeModal.close(this.horarioForm.value);
      this.horarioForm.reset();
      this.submited=false;
    }
  }  

  loadEstacions() {
    this.estacionService.getEstacions().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => this.estacions = response,
      (error) => console.error("error en el loading estacion", error)
    )
  }

  onCancel() {
    this.horarioForm.reset();
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


