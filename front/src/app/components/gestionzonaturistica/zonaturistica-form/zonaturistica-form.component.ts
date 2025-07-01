import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Estacion } from 'src/app/models/EstacionModel';
import { EstacionService } from 'src/app/services/estacion.service';

@Component({
  selector: 'app-zonaturistica-form',
  templateUrl: './zonaturistica-form.component.html',
  styleUrls: ['./zonaturistica-form.component.css']
})
export class ZonaFormComponent implements OnInit{
  zonaForm!: FormGroup;
  submited = false;

  zona: any={
    zonaEstId:'0',
  }
  isEditMode =false;
  estacions:Estacion[]=[];

  ngOnInit(): void {
    this.loadEstacions();
    this.zonaForm = this.fb.group({
      id: [this.zona?.id],
      zonaEstId: [this.zona?.zonaEstId || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidEstacion: true } : null
      ]],
      zonaNom: [this.zona?.zonaNom || '', Validators.required],
      zonaDesc: [this.zona?.zonaDesc || '', Validators.required],
      zonaDif: [this.zona?.zonaDif || '', Validators.required],
      zonaDuracAprox: [this.zona?.zonaDuracAprox || '', Validators.required],
      zonaDistMax: [this.zona?.zonaDistMax || '', Validators.required],
      estado: '1'
    });
  }


  constructor(private estacionService: EstacionService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.zonaForm = this.fb.group({
      zonaEstId: [''],
      zonaNom: [''],
      zonaDesc: [''],
      zonaDif: [''],
      zonaDuracAprox: [''],
      zonaDistMax: [''],
      estado: '1'
    })
  }


  onSubmit() {
    this.submited = true;
    if(this.zonaForm.valid){
      this.activeModal.close(this.zonaForm.value);
      this.zonaForm.reset();
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
    this.zonaForm.reset();
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


