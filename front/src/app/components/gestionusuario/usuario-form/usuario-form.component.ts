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
    UsuTipoId: '0',
    UsuGenero: '0'
  }
  isEditMode = false;
  tipos: TipoUsuario[] = [];

  ngOnInit(): void {
    this.loadTipos();
    this.usuarioForm = this.fb.group({
      id: [this.usuario?.id],
      UsuTipoId: [this.usuario?.UsuTipoId || '0', [
              Validators.required,
              (control: AbstractControl) => control.value === '0' ? { invalidTipo: true } : null
            ]],
      UsuDni: [this.usuario?.UsuDni || '', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      UsuApePaterno: [this.usuario?.UsuApePaterno || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      UsuApeMaterno: [this.usuario?.UsuApeMaterno || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      UsuNombres: [this.usuario?.UsuNombres || '', [Validators.required, Validators.pattern(/^[a-zA-ZÁÉÍÓÚÑáéíóúñ\s]+$/)]],
      UsuGenero: [this.usuario?.UsuGenero || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidGenero: true } : null
      ]],
      UsuCorreo: [this.usuario?.UsuCorreo || '', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      ]],
      UsuFecRegistro: [this.usuario?.UsuFecRegistro || '', Validators.required],
      UsuFecNacimiento: [this.usuario?.UsuFecNacimiento || '', Validators.required],
      UsuNombre: [this.usuario?.UsuNombre || '', Validators.required],
      UsuPassword: [this.usuario?.UsuPassword || '', [Validators.required, Validators.minLength(5)]],
      Estado: '1'
    })
  }


  constructor(private tipoService: TipousuarioService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.usuarioForm = this.fb.group({
      UsuTipoId: [''],
      UsuDni: [''],
      UsuApePaterno: [''],
      UsuApeMaterno: [''],
      UsuNombres: [''],
      UsuGenero: [''],
      UsuCorreo: [''],
      UsuFecRegistro: [''],
      UsuFecNacimiento: [''],
      UsuNombre: [''],
      UsuPassword: [''],
      Estado: '1'
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
