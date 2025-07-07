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
    ZonaEstId:'0',
  }
  isEditMode =false;
  estacions:Estacion[]=[];

  ngOnInit(): void {
    this.loadEstacions();
    this.zonaForm = this.fb.group({
      Id: [this.zona?.Id],
      ZonaEstId: [this.zona?.ZonaEstId || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidEstacion: true } : null
      ]],
      ZonaNombre: [this.zona?.ZonaNombre || '', Validators.required],
      ZonaDescripcion: [this.zona?.ZonaDescripcion || '', Validators.required],
      Estado: '1'
    });
  }


  constructor(private estacionService: EstacionService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.zonaForm = this.fb.group({
      ZonaEstId: [''],
      ZonaNombre: [''],
      ZonaDescripcion: [''],
      Estado: '1'
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

