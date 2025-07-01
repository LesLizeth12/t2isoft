import { Component, OnInit, ViewChild } from '@angular/core';
import { AreaFormComponent } from './area-form/area-form.component';
import { Area } from 'src/app/models/AreaModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AreaService } from 'src/app/services/area.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestionarea',
  templateUrl: './gestionarea.component.html',
  styleUrls: ['./gestionarea.component.css']
})
export class GestionareaComponent implements OnInit{
  @ViewChild('areaModal') areaModal?: AreaFormComponent;
  areas: Area [] = [];
  areaForm: FormGroup;
  currentUserId?: number;
  editMode: boolean = false;

  constructor(private areaService :AreaService , private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService){
    this.areaForm = this.fb.group({
      id: [''],
      areaNom: [''],
      areaSalario: ['']
    })
  }

  ngOnInit(): void {
    this.loadAreas();
  } 

  loadAreas(){
    this.areaService.getAreas().subscribe(
      (response) => this.areas = response,
      (error) => console.error("Error al cargar las areas", error)
    )
  }

  openModalArea(area?: Area) {
    const modalRef = this.modalService.open(AreaFormComponent);
    console.log(area);
    if (area) {
      modalRef.componentInstance.area = area;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          this.areaService.updateArea(result.id, result).subscribe({
            next: () => {
              this.loadAreas(); // this.loadPersons()
              this.alertify.success('¡Area Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar area:', err);
              this.alertify.error('Ocurrió un error al actualizar la area.');
            },
          });
        } else {
          this.areaService.createArea(result).subscribe({
            next: () => {
              this.loadAreas(); // this.loadPersons()
              this.alertify.success('¡Area Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar area:', err);
              this.alertify.error('Ocurrió un error al agregar la area..');
            },
          });
        }
        this.areaForm.reset();
      }
    });
  }
 
  resetForm() {
    this.areaForm.reset();
  }
  
  deleteArea(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar esta area?',
      () => {
        this.areaService.deleteArea(id).subscribe(() => {
          this.loadAreas();
          this.alertify.error('¡Area Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Area',
      }
    );
  }

  restoreArea(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.areaService.restoreArea(id).subscribe(() => {
          this.loadAreas();
          this.alertify.success('¡Area Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Area',
      }
    );
  }
}
