import { Component, OnInit, ViewChild } from '@angular/core';
import { ZonaFormComponent } from './zonaturistica-form/zonaturistica-form.component';
import { Estacion } from 'src/app/models/EstacionModel';
import { ZonaTuristica } from 'src/app/models/ZonaTuristicaModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ZonaturisticaService } from 'src/app/services/zonaturistica.service';
import { EstacionService } from 'src/app/services/estacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestionzona',
  templateUrl: './gestionzona.component.html',
  styleUrls: ['./gestionzona.component.css']
})
export class GestionzonaComponent implements OnInit {
  @ViewChild('zonaModal') zonaModal?: ZonaFormComponent;
  zonas: ZonaTuristica[] = [];
  estacions: Estacion[] = [];
  zonaForm: FormGroup;
  zonasCombinados: any[] = [];
  zonasCombinados2: any[] = [];
  constructor(private zonaService: ZonaturisticaService, private estacionService: EstacionService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService) {
    this.zonaForm = this.fb.group({
      id: [''],
      zonaEstId: [''],
      zonaNom: [''],
      zonaDesc: [''],
      zonaDif: [''],
      zonaDuracAprox: [''],
      zonaDistMax: [''],
    })
  }

  ngOnInit(): void {
    this.loadZonas();
    this.loadEstacions();
  }

  loadZonas() {
    this.zonaService.getZonaTuristicas().subscribe(
      (response) => {
        this.zonas = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  openModalZona(zona?: ZonaTuristica) {
    const modalRef = this.modalService.open(ZonaFormComponent);
    console.log(zona);
    if (zona) {
      modalRef.componentInstance.zona = zona;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          this.zonaService.updateZonaTuristica(result.id, result).subscribe({
            next: () => {
              this.loadZonas(); // this.loadPersons()
              this.alertify.success('Zona Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar Zona:', err);
              this.alertify.error('Ocurrió un error al actualizar la Zona.');
            },
          });
        } else {
          this.zonaService.createZonaTuristica(result).subscribe({
            next: () => {
              this.loadZonas(); // this.loadPersons()
              this.alertify.success('¡Zona Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar Zona:', err);
              this.alertify.error('Ocurrió un error al agregar la Zona..');
            },
          });
        }
        this.zonaForm.reset();
      }
    });
  }

  resetForm() {
    this.zonaForm.reset();
  }

  deleteZona(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este zona?',
      () => {
        this.zonaService.deleteZonaTuristica(id).subscribe(() => {
          this.loadZonas();
          this.alertify.error('¡Zona Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Zona',
      }
    );
  }

  restoreZona(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.zonaService.restoreZonaTuristica(id).subscribe(() => {
          this.loadZonas();
          this.alertify.success('¡Zona Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Zona',
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
    if (this.zonas.length > 0 && this.estacions.length > 0) {
      this.zonasCombinados = this.zonas.filter(zona => {
        const estacion = this.estacions.find(a => a.id === zona.zonaEstId);
        // Verifica si los tres registros tienen estado "0"
        return zona.estado === '1' && estacion?.estado === '1';
      }).map(zona => {
        const estacion = this.estacions.find(a => a.id === zona.zonaEstId);

        return {
          ...zona, // Agrega los datos del usuario
          estacionNombre: estacion?.estNom ?? 'Sin Estacion'
        };
      });
    }

  }

  combineData2(): void {
    if (this.zonas.length > 0 && this.estacions.length > 0) {
      this.zonasCombinados2 = this.zonas.filter(zona => {
        const estacion = this.estacions.find(c => c.id === zona.zonaEstId);

        // Verifica si los tres registros tienen estado "0"
        return zona.estado === '0' && estacion?.estado === '1';
      }).map(zona => {
        const estacion = this.estacions.find(c => c.id === zona.zonaEstId);

        return {
          ...zona, // Agrega los datos del usuario
          estacionNombre: estacion?.estNom ?? 'Sin Estacion'
        };
      });
    }
  }

}
