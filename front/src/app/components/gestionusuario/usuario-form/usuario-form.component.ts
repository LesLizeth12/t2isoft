import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { TipousuarioService } from 'src/app/services/tipousuario.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.css']
})
export class UsuarioFormComponent implements OnInit {
  usuarioForm!: FormGroup;
  submited = false;
  usuario: any = {
    usuarioTipoId: '0',
    usuarioGenero: '0'
  }
  isEditMode = false;
  tipos: TipoUsuario[] = [];

  ngOnInit(): void {
    this.loadTipos();
    this.usuarioForm = this.fb.group({
      id: [this.usuario?.id],
      usuarioTipoId: [this.usuario?.usuarioTipoId || '0', [
              Validators.required,
              (control: AbstractControl) => control.value === '0' ? { invalidTipo: true } : null
            ]],
      usuarioDni: [this.usuario?.usuarioDni || '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      usuarioApePat: [this.usuario?.usuarioApePat || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      usuarioApeMat: [this.usuario?.usuarioApeMat || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      usuarioNombres: [this.usuario?.usuarioNombres || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      usuarioGenero: [this.usuario?.usuarioGenero || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidGenero: true } : null
      ]],
      usuarioCorreo: [this.usuario?.usuarioCorreo || '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      ]],
      usuarioFecReg: [this.usuario?.usuarioFecReg || '', Validators.required],
      usuarioFecNac: [this.usuario?.usuarioFecNac || '', Validators.required],
      usuarioNom: [this.usuario?.usuarioNom || '', Validators.required],
      usuarioPass: [this.usuario?.usuarioPass || '', [Validators.required, Validators.minLength(5)]],
      estado: '1'
    })
  }


  constructor(private tipoService: TipousuarioService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.usuarioForm = this.fb.group({
      usuarioTipoId: [''],
      usuarioDni: [''],
      usuarioApePat: [''],
      usuarioApeMat: [''],
      usuarioNombres: [''],
      usuarioGenero: [''],
      usuarioCorreo: [''],
      usuarioFecReg: [''],
      usuarioFecNac: [''],
      usuarioNom: [''],
      usuarioPass: [''],
      estado: '1'
    })
  }


  onSubmit() {
    console.log("viene");
    this.submited = true;
    if (this.usuarioForm.valid) {
      console.log("luego entra");
      this.activeModal.close(this.usuarioForm.value);
    }
  }

  loadTipos() {
    this.tipoService.getTipoUsuarios().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => this.tipos = response,
      (error) => console.error("error en el loading empleado", error)
    )
  }
}
