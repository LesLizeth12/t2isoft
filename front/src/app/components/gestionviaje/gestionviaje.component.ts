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
  usuarioId: number = 0;
  estaciones: any[] = [];
  horarios: any[] = [];
  zonas: any[] = [];
  informe: any = {
    infClimaNom: '0'
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
      estacionId: ['', Validators.required],
      horarioId: ['', Validators.required],
      zonaId: ['', Validators.required],
      infClimaNom: ['']
    });
  }

  ngOnInit(): void {
    const idGuardado = localStorage.getItem('usuarioId');
    this.usuarioId = idGuardado ? parseInt(idGuardado, 10) : 0;
    this.http.get<any[]>('http://localhost:3000/api/estacion').subscribe(data => {
      this.estaciones = data;
      this.actualizarNombreEstacion();
      this.iniciarAnimacionTren();
    });
    this.viajeForm = this.fb.group({
      estacionId: ['', Validators.required],
      horarioId: ['', Validators.required],
      zonaId: ['', Validators.required],
      infClimaNom: [this.informe?.infClimaNom || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidClima: true } : null
      ]]
    });
  }

  onEstacionChange(): void {
    const estacionId = this.viajeForm.get('estacionId')?.value;

    if (estacionId) {
      // Zonas turísticas
      this.zonaService.getZonasByIdEstacion(estacionId).subscribe(
        (response: any) => {
          this.zonas = response.data.zonas;
          this.viajeForm.get('zonaId')?.setValue('');
        },
        error => {
          console.error('Error al obtener zonas por estación', error);
          this.zonas = [];
        }
      );

      // Horarios según dirección
      this.horarioService.getHorariosByIdEstacion(estacionId).subscribe(
        (response: any) => {
          const todosHorarios = response.data.horarios;

          // Filtrar por dirección
          this.horarios = todosHorarios.filter((hor: any) => {
            if (this.direccion === 'ida') {
              return hor.estado === 'ida';
            } else {
              return hor.estado === 'vuelta';
            }
          });

          this.viajeForm.get('horarioId')?.setValue('');
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
      const estacionSeleccionadaId = this.viajeForm.get('estacionId')?.value;
      const estacionActualId = this.estaciones[this.estacionActualIndex]?.id;
      console.log('Estación seleccionada:', estacionSeleccionadaId, typeof estacionSeleccionadaId);
      console.log('Estación actual:', estacionActualId, typeof estacionActualId);
      if (+estacionSeleccionadaId === +estacionActualId) {
        // ✅ El tren está en la estación seleccionada
        this.mensajeViaje = '✅ ¡Buen viaje! El tren está en la estación seleccionada.';

        // Obtener valores para el modal
        const estacionNombre = this.estaciones.find(e => e.id === +estacionSeleccionadaId)?.estNom || '';
        const zonaNombre = this.zonas.find(z => z.id === +this.viajeForm.get('zonaId')?.value)?.zonaNom || '';
        const horario = this.horarios.find(h => h.id === +this.viajeForm.get('horarioId')?.value);
        const horarioTexto = horario ? `${horario.horSalida} - ${horario.horLlegada} (S/. ${horario.horPrecio})` : '';
        const clima = this.viajeForm.get('infClimaNom')?.value || 'Desconocido';

        // Abrir modal
        const modalRef = this.modalService.open(ViajeFormComponent);
        modalRef.componentInstance.estacionNombre = estacionNombre;
        modalRef.componentInstance.zonaNombre = zonaNombre;
        modalRef.componentInstance.horarioTexto = horarioTexto;
        modalRef.componentInstance.clima = clima;

        const nuevoInforme = {
          infUsuarioId: this.usuarioId, // Cambia esto si tienes login
          infEstId: +estacionSeleccionadaId,
          infZonaId: +this.viajeForm.get('zonaId')?.value,
          infHorId: +this.viajeForm.get('horarioId')?.value,
          infClimaNom: this.viajeForm.get('infClimaNom')?.value,
          infFecActual: new Date().toISOString().split('T')[0],
          estado: 'activo'
        };

        this.informeService.createInforme(nuevoInforme).subscribe({
          next: () => console.log('✅ Informe guardado correctamente'),
          error: err => console.error('❌ Error al guardar el informe:', err)
        });

      } else {
        const nombreEstacion = this.estaciones[this.estacionActualIndex]?.estNom || 'otra estación';
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
      this.nombreEstacionActual = this.estaciones[this.estacionActualIndex].estNom;
    } else {
      this.nombreEstacionActual = 'Cargando...';
    }
  }

  verPronostico(): void {
    const estacionId = this.viajeForm.get('estacionId')?.value;
    if (!estacionId || !this.fechaPronostico) {
      this.mensajeViaje = '🔴 Seleccione estación y fecha para ver el pronóstico.';
      return;
    }

    //const estados = ['Soleado', 'Nublado', 'Lluvia', 'Tormenta', 'Niebla', 'Viento'];
    //const estado = estados[Math.floor(Math.random() * estados.length)];
    const min = Math.floor(Math.random() * 10) + 10; // 10 - 19
    const max = min + Math.floor(Math.random() * 10) + 5; // al menos +5 grados
    const actual = min + Math.floor(Math.random() * (max - min + 1));

    // Determinar estado según temperatura
    let estado = '';
    if (actual >= 28) {
      estado = 'Soleado';
    } else if (actual >= 22 && actual < 28) {
      estado = 'Parcialmente Nublado';
    } else if (actual >= 17 && actual < 22) {
      estado = 'Nublado';
    } else if (actual >= 13 && actual < 17) {
      estado = 'Lluvia';
    } else {
      estado = 'Niebla';
    }
    const pronostico = {
      climaEstId: estacionId,
      climaFec: this.fechaPronostico,
      climaTempMin: min,
      climaTempMax: max,
      climaTempActual: actual,
      estado: estado
    };


  }
}
