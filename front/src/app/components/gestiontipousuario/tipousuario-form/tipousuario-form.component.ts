import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';

@Component({
  selector: 'app-tipousuario-form',
  templateUrl: './tipousuario-form.component.html',
  styleUrls: ['./tipousuario-form.component.css']
})
export class TipousuarioFormComponent implements OnInit{
  tipoForm!: FormGroup;
  submited = false;
  tipo: TipoUsuario | undefined;
  isEditMode =false;

  ngOnInit(): void {
    this.tipoForm = this.fb.group({
      Id: [this.tipo?.Id],
      TipoNombre: [this.tipo?.TipoNombre || '', Validators.required],
      Estado: '1'
    })
  }

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.tipoForm = this.fb.group({
      TipoNombre: [''],
      Estado: '1'
    })
  }

  onSubmit() {
    console.log("viene");
    this.submited = true;
    if(this.tipoForm.valid){
      console.log("luego entra");
      this.activeModal.close(this.tipoForm.value);
    }
  }
}
