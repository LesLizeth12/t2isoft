import { Component, OnInit, ViewChild } from '@angular/core';
import { TipousuarioFormComponent } from './tipousuario-form/tipousuario-form.component';
import { TipoUsuario } from 'src/app/models/TipoUsuarioModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TipousuarioService } from 'src/app/services/tipousuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestiontipousuario',
  templateUrl: './gestiontipousuario.component.html',
  styleUrls: ['./gestiontipousuario.component.css']
})
export class GestiontipousuarioComponent implements OnInit{
  @ViewChild('tipoModal') tipoModal?: TipousuarioFormComponent;
  tipos: TipoUsuario[] = [];
  tipoForm: FormGroup;
  currentUserId?: number;
  editMode: boolean = false;

  constructor(private tipoService: TipousuarioService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService) {
    this.tipoForm = this.fb.group({
      id: [''],
      tipoNom: ['']
    })
  }

  ngOnInit(): void {
    this.loadTipoUsuarios();
  }

  loadTipoUsuarios() {
    this.tipoService.getTipoUsuarios().subscribe(
      (response) => this.tipos = response,
      (error) => console.error("Error al cargar los tipos", error)
    )
  }

  openModalTipoUsuario(tipo?: TipoUsuario) {
    const modalRef = this.modalService.open(TipousuarioFormComponent);
    console.log(tipo);
    if (tipo) {
      modalRef.componentInstance.tipo = tipo;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          this.tipoService.updateTipoUsuario(result.id, result).subscribe({
            next: () => {
              this.loadTipoUsuarios(); // this.loadPersons()
              this.alertify.success('¡TipoUsuario Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar tipo:', err);
              this.alertify.error('Ocurrió un error al actualizar la tipo.');
            },
          });
        } else {
          this.tipoService.createTipoUsuario(result).subscribe({
            next: () => {
              this.loadTipoUsuarios(); // this.loadPersons()
              this.alertify.success('¡TipoUsuario Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar tipo:', err);
              this.alertify.error('Ocurrió un error al agregar la tipo..');
            },
          });
        }
        this.tipoForm.reset();
      }
    });
  }

  resetForm() {
    this.tipoForm.reset();
  }

  deleteTipoUsuario(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar esta tipo?',
      () => {
        this.tipoService.deleteTipoUsuario(id).subscribe(() => {
          this.loadTipoUsuarios();
          this.alertify.error('¡TipoUsuario Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar TipoUsuario',
      }
    );
  }

  restoreTipoUsuario(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.tipoService.restoreTipoUsuario(id).subscribe(() => {
          this.loadTipoUsuarios();
          this.alertify.success('¡TipoUsuario Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar TipoUsuario',
      }
    );
  }
}
