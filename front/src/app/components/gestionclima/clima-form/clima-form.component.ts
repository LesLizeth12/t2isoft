import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Estacion } from 'src/app/models/EstacionModel';
import { EstacionService } from 'src/app/services/estacion.service';

@Component({
  selector: 'app-clima-form',
  templateUrl: './clima-form.component.html',
  styleUrls: ['./clima-form.component.css']
})
export class ClimaFormComponent implements OnInit{
  climaForm!: FormGroup;
  submited = false;

  clima: any={
    climaEstId:'0',
  }
  isEditMode =false;
  estacions:Estacion[]=[];

  ngOnInit(): void {
    this.loadEstacions();
    this.climaForm = this.fb.group({
      id: [this.clima?.id],
      climaEstId: [this.clima?.climaEstId || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidEstacion: true } : null
      ]],
      climaFec: [this.clima?.climaFec || '', Validators.required],
      climaTempMax: [this.clima?.climaTempMax || '', Validators.required],
      climaTempMin: [this.clima?.climaTempMin || '', Validators.required],
      estado: '1'
    });
  }


  constructor(private estacionService: EstacionService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.climaForm = this.fb.group({
      climaEstId: [''],
      climaFec: [''],
      climaTempMax: [''],
      climaTempMin: [''],
      estado: '1'
    })
  }


  onSubmit() {
    this.submited = true;
    if(this.climaForm.valid){
      this.activeModal.close(this.climaForm.value);
      this.climaForm.reset();
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
    this.climaForm.reset();
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


