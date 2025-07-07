import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { Usuario } from 'src/app/models/UsuarioModel';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';
import { TipousuarioService } from 'src/app/services/tipousuario.service';

@Component({
  selector: 'app-gestionusuario',
  templateUrl: './gestionusuario.component.html',
  styleUrls: ['./gestionusuario.component.css']
})
export class GestionusuarioComponent implements OnInit {
  @ViewChild('usuarioModal') usuarioModal?: UsuarioFormComponent;
  usuarios: Usuario[] = [];
  tipos: TipoUsuario[] = [];
  usuarioForm: FormGroup;
  usuariosCombinados: any[] = [];
  usuariosCombinados2: any[] = [];
  constructor(private usuarioService: UsuarioService, private tiposService: TipousuarioService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService) {
    this.usuarioForm = this.fb.group({
      id: [''],
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
      UsuPassword: ['']
      
    })
  }

  ngOnInit(): void {
    this.loadUsuarios();
    this.loadTipos();
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe(
      (response) => {
        this.usuarios = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  openModalUsuario(usuario?: Usuario) {
    const modalRef = this.modalService.open(UsuarioFormComponent);
    console.log(usuario);
    if (usuario) {
      modalRef.componentInstance.usuario = usuario;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.Id) {
          this.usuarioService.updateUsuario(result.Id, result).subscribe({
            next: () => {
              this.loadUsuarios(); // this.loadPersons()
              this.alertify.success('Usuario Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar Usuario:', err);
              this.alertify.error('Ocurrió un error al actualizar la Usuario.');
            },
          });
        } else {
          this.usuarioService.createUsuario(result).subscribe({
            next: () => {
              this.loadUsuarios(); // this.loadPersons()
              this.alertify.success('¡Usuario Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar Usuario:', err);
              this.alertify.error('Ocurrió un error al agregar la Usuario..');
            },
          });
        }
        this.usuarioForm.reset();
      }
    });
  }

  resetForm() {
    this.usuarioForm.reset();
  }

  deleteUsuario(Id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este usuario?',
      () => {
        this.usuarioService.deleteUsuario(Id).subscribe(() => {
          this.loadUsuarios();
          this.alertify.error('¡Usuario Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Usuario',
      }
    );
  }

  restoreUsuario(Id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.usuarioService.restoreUsuario(Id).subscribe(() => {
          this.loadUsuarios();
          this.alertify.success('¡Usuario Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Usuario',
      }
    );
  }

  loadTipos() {
    this.tiposService.getTipoUsuarios().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.tipos = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  /*
  getEmpleadoNombre(id_empleados: number): string {
    const cat = this.empleados.find(c => c.id === id_empleados);
    return cat ? cat.nombre : 'Sin Empleado';
  }
    */

  combineData(): void {
    if (this.usuarios.length > 0 && this.tipos.length > 0) {
      this.usuariosCombinados = this.usuarios.filter(usuario => {
        const tipos = this.tipos.find(t => t.Id === usuario.UsuTipoId);
        // Verifica si los tres registros tienen Estado "0"
        return usuario.Estado === '1' && tipos?.Estado === '1';
      }).map(usuario => {
        const tipos = this.tipos.find(t => t.Id === usuario.UsuTipoId);
        return {
          ...usuario, // Agrega los datos del usuario
          TipoNombre: tipos?.TipoNombre ?? 'Sin Tipo',
        };
      });
    }

  }

  combineData2(): void {
    if (this.usuarios.length > 0 && this.tipos.length > 0) {
      this.usuariosCombinados2 = this.usuarios.filter(usuario => {
        const tipos = this.tipos.find(t => t.Id === usuario.UsuTipoId);
        // Verifica si los tres registros tienen Estado "0"
        return usuario.Estado === '0' && tipos?.Estado === '1';
      }).map(usuario => {
        const tipos = this.tipos.find(t => t.Id === usuario.UsuTipoId);
        return {
          ...usuario, // Agrega los datos del usuario
          TipoNombre: tipos?.TipoNombre ?? 'Sin Tipo',
        };
      });
    }
  }
}
