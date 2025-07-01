import { Component, OnInit, ViewChild } from '@angular/core';
import { ClimaFormComponent } from './clima-form/clima-form.component';
import { Estacion } from 'src/app/models/EstacionModel';
import { Clima } from 'src/app/models/ClimaModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClimaService } from 'src/app/services/clima.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestionclima',
  templateUrl: './gestionclima.component.html',
  styleUrls: ['./gestionclima.component.css']
})
export class GestionclimaComponent implements OnInit {
  @ViewChild('climaModal') climaModal?: ClimaFormComponent;
  climas: Clima[] = [];
  estacions: Estacion[] = [];
  climaForm: FormGroup;
  climasCombinados: any[] = [];
  climasCombinados2: any[] = [];
  constructor(private climaService: ClimaService, private estacionService: EstacionService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService) {
    this.climaForm = this.fb.group({
      id: [''],
      climaEstId: [''],
      climaFec: [''],
      climaTempMax: [''],
      climaTempMin: ['']
    })
  }

  ngOnInit(): void {
    this.loadClimas();
    this.loadEstacions();
  }

  loadClimas() {
    this.climaService.getClimas().subscribe(
      (response) => {
        this.climas = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  openModalClima(clima?: Clima) {
    const modalRef = this.modalService.open(ClimaFormComponent);
    console.log(clima);
    if (clima) {
      modalRef.componentInstance.clima = clima;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          this.climaService.updateClima(result.id, result).subscribe({
            next: () => {
              this.loadClimas(); // this.loadPersons()
              this.alertify.success('Clima Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar Clima:', err);
              this.alertify.error('Ocurrió un error al actualizar la Clima.');
            },
          });
        } else {
          this.climaService.createClima(result).subscribe({
            next: () => {
              this.loadClimas(); // this.loadPersons()
              this.alertify.success('¡Clima Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar Clima:', err);
              this.alertify.error('Ocurrió un error al agregar la Clima..');
            },
          });
        }
        this.climaForm.reset();
      }
    });
  }

  resetForm() {
    this.climaForm.reset();
  }

  deleteClima(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este clima?',
      () => {
        this.climaService.deleteClima(id).subscribe(() => {
          this.loadClimas();
          this.alertify.error('¡Clima Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Clima',
      }
    );
  }

  restoreClima(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.climaService.restoreClima(id).subscribe(() => {
          this.loadClimas();
          this.alertify.success('¡Clima Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Clima',
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

  private calcularEdad(fechaNac: string): number {
    const hoy = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }

    return edad;
  }

  // ✅ Nueva función para parsear fechas en local y evitar desfases de día
  private parseFechaLocal(fecha: string): Date {
    const [year, month, day] = fecha.split('-').map(Number);
    return new Date(year, month - 1, day);
  }

  private calcularAntiguedad(fechaInicio: string): string {
    const inicio = this.parseFechaLocal(fechaInicio);
    const hoy = new Date();

    let años = hoy.getFullYear() - inicio.getFullYear();
    let meses = hoy.getMonth() - inicio.getMonth();
    let dias = hoy.getDate() - inicio.getDate();

    if (dias < 0) {
      meses--;
      // Obtener cuántos días tiene el mes anterior al actual
      const mesAnterior = new Date(hoy.getFullYear(), hoy.getMonth(), 0);
      dias += mesAnterior.getDate();
    }

    if (meses < 0) {
      años--;
      meses += 12;
    }

    let resultado = '';
    if (años > 0) resultado += `${años} año${años !== 1 ? 's' : ''} `;
    if (meses > 0) resultado += `${meses} mes${meses !== 1 ? 'es' : ''} `;
    if (dias > 0) resultado += `${dias} día${dias !== 1 ? 's' : ''}`;

    return resultado.trim();
  }

  combineData(): void {
    if (this.climas.length > 0 && this.estacions.length > 0) {
      this.climasCombinados = this.climas.filter(clima => {
        const estacion = this.estacions.find(a => a.id === clima.climaEstId);
        // Verifica si los tres registros tienen estado "0"
        return clima.estado === '1' && estacion?.estado === '1';
      }).map(clima => {
        const estacion = this.estacions.find(a => a.id === clima.climaEstId);

        return {
          ...clima, // Agrega los datos del usuario
          estacionNombre: estacion?.estNom ?? 'Sin Estacion'
        };
      });
    }

  }

  combineData2(): void {
    if (this.climas.length > 0 && this.estacions.length > 0) {
      this.climasCombinados2 = this.climas.filter(clima => {
        const estacion = this.estacions.find(c => c.id === clima.climaEstId);

        // Verifica si los tres registros tienen estado "0"
        return clima.estado === '0' && estacion?.estado === '1';
      }).map(clima => {
        const estacion = this.estacions.find(c => c.id === clima.climaEstId);

        return {
          ...clima, // Agrega los datos del usuario
          estacionNombre: estacion?.estNom ?? 'Sin Estacion'
        };
      });
    }
  }

}
