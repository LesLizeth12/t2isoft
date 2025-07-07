import { Component, OnInit, ViewChild } from '@angular/core';
import { EstacionFormComponent } from './estacion-form/estacion-form.component';
import { Estacion } from 'src/app/models/EstacionModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstacionService } from 'src/app/services/estacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-gestionestacion',
  templateUrl: './gestionestacion.component.html',
  styleUrls: ['./gestionestacion.component.css']
})
export class GestionestacionComponent implements OnInit{
  @ViewChild('estacionModal') estacionModal?: EstacionFormComponent;
  estacions: Estacion [] = [];
  estacionForm: FormGroup;
  currentUserId?: number;
  editMode: boolean = false;

  constructor(private estacionService :EstacionService , private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService){
    this.estacionForm = this.fb.group({
      id: [''],
      EstNombre: [''],
      EstDescripcion: ['']
    })
  }

  ngOnInit(): void {
    this.loadEstacions();
  } 

  loadEstacions(){
    this.estacionService.getEstacions().subscribe(
      (response) => this.estacions = response,
      (error) => console.error("Error al cargar las estacions", error)
    )
  }

  openModalEstacion(estacion?: Estacion) {
    const modalRef = this.modalService.open(EstacionFormComponent);
    console.log(estacion);
    if (estacion) {
      modalRef.componentInstance.estacion = estacion;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.Id) {
          this.estacionService.updateEstacion(result.Id, result).subscribe({
            next: () => {
              this.loadEstacions(); // this.loadPersons()
              this.alertify.success('¡Estacion Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar estacion:', err);
              this.alertify.error('Ocurrió un error al actualizar la estacion.');
            },
          });
        } else {
          this.estacionService.createEstacion(result).subscribe({
            next: () => {
              this.loadEstacions(); // this.loadPersons()
              this.alertify.success('¡Estacion Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar estacion:', err);
              this.alertify.error('Ocurrió un error al agregar la estacion..');
            },
          });
        }
        this.estacionForm.reset();
      }
    });
  }
 
  resetForm() {
    this.estacionForm.reset();
  }
  
  deleteEstacion(Id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar esta estacion?',
      () => {
        this.estacionService.deleteEstacion(Id).subscribe(() => {
          this.loadEstacions();
          this.alertify.error('¡Estacion Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Estacion',
      }
    );
  }

  restoreEstacion(Id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.estacionService.restoreEstacion(Id).subscribe(() => {
          this.loadEstacions();
          this.alertify.success('¡Estacion Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Estacion',
      }
    );
  }

  exportToExcel(): void {
  const dataExport = this.estacions.map(estacion => ({
    NOMBRE: estacion.EstNombre,
    DESCRIPCIÓN: estacion.EstDescripcion,
    ESTADO: estacion.Estado === '1' ? 'Activo' : 'Baja'
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExport);
  const workbook: XLSX.WorkBook = { Sheets: { 'Estaciones': worksheet }, SheetNames: ['Estaciones'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob: Blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  });
  FileSaver.saveAs(blob, 'estaciones.xlsx');
}
}
