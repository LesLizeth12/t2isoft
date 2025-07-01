import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/models/EmpleadoModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { EmpleadoService } from 'src/app/services/empleado.service';
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
    usuarioEmpId: '0',
    usuarioTipoId: '0'
  }
  isEditMode = false;
  empleados: Empleado[] = [];
  tipos: TipoUsuario[] = [];

  ngOnInit(): void {
    this.loadEmpleados();
    this.loadTipos();
    this.usuarioForm = this.fb.group({
      id: [this.usuario?.id],
      usuarioNom: [this.usuario?.usuarioNom || '', Validators.required],
      usuarioPass: [this.usuario?.usuarioPass || '', [Validators.required, Validators.minLength(5)]],
      usuarioEmpId: [this.usuario?.usuarioEmpId || '0', [
              Validators.required,
              (control: AbstractControl) => control.value === '0' ? { invalidEmpleado: true } : null
            ]],
      usuarioTipoId: [this.usuario?.usuarioTipoId || '0', [
              Validators.required,
              (control: AbstractControl) => control.value === '0' ? { invalidTipo: true } : null
            ]],
      estado: '1'
    })
  }


  constructor(private empleadoService: EmpleadoService, private tipoService: TipousuarioService, private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.usuarioForm = this.fb.group({
      usuarioNom: [''],
      usuarioPass: [''],
      usuarioEmpId: [''],
      usuarioTipoId: [''],
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

  loadEmpleados() {
    this.empleadoService.getEmpleados().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => this.empleados = response,
      (error) => console.error("error en el loading empleado", error)
    )
  }

  loadTipos() {
    this.tipoService.getTipoUsuarios().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => this.tipos = response,
      (error) => console.error("error en el loading empleado", error)
    )
  }
}
