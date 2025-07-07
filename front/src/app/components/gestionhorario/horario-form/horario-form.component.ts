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
    HorEstId:'0',
  }
  isEditMode =false;
  estacions:Estacion[]=[];

  ngOnInit(): void {
    this.loadEstacions();
    this.horarioForm = this.fb.group({
      Id: [this.horario?.Id],
      HorEstId: [this.horario?.HorEstId || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidEstacion: true } : null
      ]],
      HorLlegada: [this.horario?.HorLlegada || '', Validators.required],
      HorSalida: [this.horario?.HorSalida || '', Validators.required],
      HorPrecio: [this.horario?.HorPrecio || '', Validators.required],
      Estado: '1'
    });
  }


  constructor(private estacionService: EstacionService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.horarioForm = this.fb.group({
      HorEstId: [''],
      HorLlegada: [''],
      HorSalida: [''],
      HorPrecio: [''],
      Estado: '1'
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


