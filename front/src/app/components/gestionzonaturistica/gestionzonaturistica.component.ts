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
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-gestionzona',
  templateUrl: './gestionzonaturistica.component.html',
  styleUrls: ['./gestionzonaturistica.component.css']
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
      Id: [''],
      ZonaEstId: [''],
      ZonaNombre: [''],
      ZonaDescripcion: [''],
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
        if (result.Id) {
          this.zonaService.updateZonaTuristica(result.Id, result).subscribe({
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

  deleteZona(Id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este zona?',
      () => {
        this.zonaService.deleteZonaTuristica(Id).subscribe(() => {
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

  restoreZona(Id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.zonaService.restoreZonaTuristica(Id).subscribe(() => {
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
        const estacion = this.estacions.find(a => a.Id === zona.ZonaEstId);
        // Verifica si los tres registros tienen Estado "0"
        return zona.Estado === '1' && estacion?.Estado === '1';
      }).map(zona => {
        const estacion = this.estacions.find(a => a.Id === zona.ZonaEstId);

        return {
          ...zona, // Agrega los datos del usuario
          estacionNombre: estacion?.EstNombre ?? 'Sin Estacion'
        };
      });
    }

  }

  combineData2(): void {
    if (this.zonas.length > 0 && this.estacions.length > 0) {
      this.zonasCombinados2 = this.zonas.filter(zona => {
        const estacion = this.estacions.find(c => c.Id === zona.ZonaEstId);

        // Verifica si los tres registros tienen Estado "0"
        return zona.Estado === '0' && estacion?.Estado === '1';
      }).map(zona => {
        const estacion = this.estacions.find(c => c.Id === zona.ZonaEstId);

        return {
          ...zona, // Agrega los datos del usuario
          estacionNombre: estacion?.EstNombre ?? 'Sin Estacion'
        };
      });
    }
  }

  exportToExcel(): void {
  const dataExport = this.zonasCombinados.map(zona => ({
    ESTACIÓN: zona.estacionNombre,
    ZONA: zona.ZonaNombre,
    DESCRIPCIÓN: zona.ZonaDescripcion
  }));

  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataExport);
  const workbook: XLSX.WorkBook = { Sheets: { 'ZonasTuristicas': worksheet }, SheetNames: ['ZonasTuristicas'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

  const blob: Blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  });
  FileSaver.saveAs(blob, 'zonas-turisticas.xlsx');
}

}
