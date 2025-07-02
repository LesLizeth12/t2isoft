import { Component, OnInit, ViewChild } from '@angular/core';
import { HorarioFormComponent } from './horario-form/horario-form.component';
import { Estacion } from 'src/app/models/EstacionModel';
import { Horario } from 'src/app/models/HorarioModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HorarioService } from 'src/app/services/horario.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestionhorario',
  templateUrl: './gestionhorario.component.html',
  styleUrls: ['./gestionhorario.component.css']
})
export class GestionhorarioComponent implements OnInit {
  @ViewChild('horarioModal') horarioModal?: HorarioFormComponent;
  horarios: Horario[] = [];
  estacions: Estacion[] = [];
  horarioForm: FormGroup;
  horariosCombinados: any[] = [];
  horariosCombinados2: any[] = [];
  constructor(private horarioService: HorarioService, private estacionService: EstacionService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService) {
    this.horarioForm = this.fb.group({
      id: [''],
      horEstId: [''],
      horLlegada: [''],
      horSalida: [''],
      horPrecio: [''],
      horDurac: ['']
    })
  }

  ngOnInit(): void {
    this.loadHorarios();
    this.loadEstacions();
  }

  loadHorarios() {
    this.horarioService.getHorarios().subscribe(
      (response) => {
        this.horarios = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  openModalHorario(horario?: Horario) {
    const modalRef = this.modalService.open(HorarioFormComponent);
    console.log(horario);
    if (horario) {
      modalRef.componentInstance.horario = horario;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          this.horarioService.updateHorario(result.id, result).subscribe({
            next: () => {
              this.loadHorarios(); // this.loadPersons()
              this.alertify.success('Horario Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar Horario:', err);
              this.alertify.error('Ocurrió un error al actualizar la Horario.');
            },
          });
        } else {
          this.horarioService.createHorario(result).subscribe({
            next: () => {
              this.loadHorarios(); // this.loadPersons()
              this.alertify.success('¡Horario Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar Horario:', err);
              this.alertify.error('Ocurrió un error al agregar la Horario..');
            },
          });
        }
        this.horarioForm.reset();
      }
    });
  }

  resetForm() {
    this.horarioForm.reset();
  }

  deleteHorario(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este horario?',
      () => {
        this.horarioService.deleteHorario(id).subscribe(() => {
          this.loadHorarios();
          this.alertify.error('¡Horario Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Horario',
      }
    );
  }

  restoreHorario(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.horarioService.restoreHorario(id).subscribe(() => {
          this.loadHorarios();
          this.alertify.success('¡Horario Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Horario',
      }
    );
  }

  loadEstacions() {
    this.estacionService.getEstacions().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.estacions = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }
  /*
  getEstacionNombre(id_estacion: number): string {
    const cat = this.estacions.find(c => c.id === id_estacion);
    return cat ? cat.nombre : 'Sin Estacion';
  }
    */

  combineData(): void {
    if (this.horarios.length > 0 && this.estacions.length > 0) {
      this.horariosCombinados = this.horarios.filter(horario => {
        const estacion = this.estacions.find(a => a.id === horario.horEstId);
        // Verifica si los tres registros tienen estado "0"
        return  estacion?.estado === '1';
      }).map(horario => {
        const estacion = this.estacions.find(a => a.id === horario.horEstId);

        return {
          ...horario, // Agrega los datos del usuario
          estacionNombre: estacion?.estNom ?? 'Sin Estacion'
        };
      });
    }

  }

  combineData2(): void {
    if (this.horarios.length > 0 && this.estacions.length > 0) {
      this.horariosCombinados2 = this.horarios.filter(horario => {
        const estacion = this.estacions.find(c => c.id === horario.horEstId);

        // Verifica si los tres registros tienen estado "0"
        return estacion?.estado === '1';
      }).map(horario => {
        const estacion = this.estacions.find(c => c.id === horario.horEstId);

        return {
          ...horario, // Agrega los datos del usuario
          estacionNombre: estacion?.estNom ?? 'Sin Estacion'
        };
      });
    }
  }

}
