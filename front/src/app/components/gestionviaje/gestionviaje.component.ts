import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';
import { HttpClient } from '@angular/common/http';
import { EstacionService } from 'src/app/services/estacion.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ZonaturisticaService } from 'src/app/services/zonaturistica.service';
import { InformeService } from 'src/app/services/informe.service';
import { ViajeFormComponent } from './viaje-form/viaje-form.component';

@Component({
  selector: 'app-gestionviaje',
  templateUrl: './gestionviaje.component.html',
  styleUrls: ['./gestionviaje.component.css']
})
export class GestionviajeComponent implements OnInit {
  viajeForm: FormGroup;
  InfUsuId: number = 0;
  estaciones: any[] = [];
  horarios: any[] = [];
  zonas: any[] = [];
  informe: any = {
    InfClimaNombre: '0'
  }
  estacionActualIndex: number = 0;
  direccion: 'ida' | 'vuelta' = 'ida';
  nombreEstacionActual: string = '';
  mensajeViaje: string = '';

  climaPronostico: any = null;
  fechaPronostico: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private zonaService: ZonaturisticaService,
    private horarioService: HorarioService,
    private informeService: InformeService,
    private modalService: NgbModal,
  ) {
    this.viajeForm = this.fb.group({
      InfEstId: ['', Validators.required],
      InfHorId: ['', Validators.required],
      InfZonaId: ['', Validators.required],
      InfClimaNombre: ['']
    });
  }

  ngOnInit(): void {
    const idGuardado = localStorage.getItem('usuarioId');
    this.InfUsuId = idGuardado ? parseInt(idGuardado, 10) : 0;
    this.http.get<any[]>('http://localhost:3000/api/estacion').subscribe(data => {
      this.estaciones = data;
      this.actualizarNombreEstacion();
      this.iniciarAnimacionTren();
    });
    this.viajeForm = this.fb.group({
      InfEstId: ['', Validators.required],
      InfHorId: ['', Validators.required],
      InfZonaId: ['', Validators.required],
      InfClimaNombre: [this.informe?.InfClimaNombre || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidClima: true } : null
      ]],
      destino: ['', Validators.required],
    });
  }

  onEstacionChange(): void {
    const InfEstId = this.viajeForm.get('InfEstId')?.value;

    if (InfEstId) {
      this.zonaService.getZonasByIdEstacion(InfEstId).subscribe(
        (response: any) => {
          this.zonas = response.data.zonas;
          this.viajeForm.get('InfZonaId')?.setValue('');
        },
        error => {
          console.error('Error al obtener zonas por estación', error);
          this.zonas = [];
        }
      );
      this.horarioService.getHorariosByIdEstacion(InfEstId).subscribe(
        (response: any) => {
          const todosHorarios = response.data.horarios;

          // Filtrar por dirección
          this.horarios = todosHorarios.filter((hor: any) => {
            if (this.direccion === 'ida') {
              return hor.Estado === 'ida';
            } else {
              return hor.Estado === 'vuelta';
            }
          });

          this.viajeForm.get('InfHorId')?.setValue('');
        },
        error => {
          console.error('Error al obtener horarios por estación', error);
          this.horarios = [];
        }
      );
    }
  }

  reservarViaje(): void {
    if (this.viajeForm.valid) {
      const estacionSeleccionadaId = this.viajeForm.get('InfEstId')?.value;
      const estacionActualId = this.estaciones[this.estacionActualIndex]?.Id;
      console.log('Estación seleccionada:', estacionSeleccionadaId, typeof estacionSeleccionadaId);
      console.log('Estación actual:', estacionActualId, typeof estacionActualId);
      if (+estacionSeleccionadaId === +estacionActualId) {
        this.mensajeViaje = '✅ ¡Buen viaje! El tren está en la estación seleccionada.';

        const estacionNombre = this.estaciones.find(e => e.Id === +estacionSeleccionadaId)?.EstNombre || '';
        const zonaNombre = this.zonas.find(z => z.Id === +this.viajeForm.get('InfZonaId')?.value)?.ZonaNombre || '';
        const horario = this.horarios.find(h => h.Id === +this.viajeForm.get('InfHorId')?.value);
        const horarioTexto = horario ? `${horario.HorSalida} - ${horario.HorLlegada} (S/. ${horario.HorPrecio})` : '';
        const clima = this.viajeForm.get('InfClimaNombre')?.value || 'Desconocido';
        const estacionDestino= this.estaciones.find(e => e.Id === +this.viajeForm.get('destino')?.value)?.EstNombre || '';
        // Abrir modal
        const modalRef = this.modalService.open(ViajeFormComponent);
        modalRef.componentInstance.estacionNombre = estacionNombre;
        modalRef.componentInstance.zonaNombre = zonaNombre;
        modalRef.componentInstance.horarioTexto = horarioTexto;
        modalRef.componentInstance.clima = clima;
        modalRef.componentInstance.estacionDestino = estacionDestino;

        const nuevoInforme = {
          InfUsuId: this.InfUsuId, 
          InfEstId: +estacionSeleccionadaId,
          InfZonaId: +this.viajeForm.get('InfZonaId')?.value,
          InfHorId: +this.viajeForm.get('InfHorId')?.value,
          InfClimaNombre: this.viajeForm.get('InfClimaNombre')?.value,
          InfFecActual: new Date().toISOString().split('T')[0],
          Estado: 'activo'
        };

        this.informeService.createInforme(nuevoInforme).subscribe({
          next: () => console.log('✅ Informe guardado correctamente'),
          error: err => console.error('❌ Error al guardar el informe:', err)
        });

      } else {
        const nombreEstacion = this.estaciones[this.estacionActualIndex]?.EstNombre || 'otra estación';
        this.mensajeViaje = `⏳ El tren actualmente se encuentra en "${nombreEstacion}". Por favor, espere su llegada.`;
      }

    } else {
      this.mensajeViaje = '⚠️ Por favor, complete todos los campos del formulario antes de reservar.';
    }

  }

  iniciarAnimacionTren(): void {
    setInterval(() => {
      if (this.direccion === 'ida') {
        this.estacionActualIndex++;
        if (this.estacionActualIndex >= this.estaciones.length - 1) {
          this.estacionActualIndex = this.estaciones.length - 1;
          this.direccion = 'vuelta';
        }
      } else {
        this.estacionActualIndex--;
        if (this.estacionActualIndex <= 0) {
          this.estacionActualIndex = 0;
          this.direccion = 'ida';
        }
      }
      this.actualizarNombreEstacion();
    }, 10000);
  }

  actualizarNombreEstacion(): void {
    if (this.estaciones.length > 0) {
      this.nombreEstacionActual = this.estaciones[this.estacionActualIndex].EstNombre;
    } else {
      this.nombreEstacionActual = 'Cargando...';
    }
  }

  verPronostico(): void {
    const InfEstId = this.viajeForm.get('InfEstId')?.value;
    if (!InfEstId || !this.fechaPronostico) {
      this.mensajeViaje = '🔴 Seleccione estación y fecha para ver el pronóstico.';
      return;
    }

    //const estados = ['Soleado', 'Nublado', 'Lluvia', 'Tormenta', 'Niebla', 'Viento'];
    //const estado = estados[Math.floor(Math.random() * estados.length)];
    const min = Math.floor(Math.random() * 10) + 10; 
    const max = min + Math.floor(Math.random() * 10) + 5; 
    const actual = min + Math.floor(Math.random() * (max - min + 1));

    // Determinar estado según temperatura
    let Estado = '';
    if (actual >= 28) {
      Estado = 'Soleado';
    } else if (actual >= 22 && actual < 28) {
      Estado = 'Parcialmente Nublado';
    } else if (actual >= 17 && actual < 22) {
      Estado = 'Nublado';
    } else if (actual >= 13 && actual < 17) {
      Estado = 'Lluvia';
    } else {
      Estado = 'Niebla';
    }
    const pronostico = {
      climaEstId: InfEstId,
      climaFec: this.fechaPronostico,
      climaTempMin: min,
      climaTempMax: max,
      climaTempActual: actual,
      Estado: Estado
    };


  }
}
