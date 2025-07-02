import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';
import { HttpClient } from '@angular/common/http';
import { EstacionService } from 'src/app/services/estacion.service';
import { HorarioService } from 'src/app/services/horario.service';
import { ZonaturisticaService } from 'src/app/services/zonaturistica.service';

@Component({
  selector: 'app-gestionviaje',
  templateUrl: './gestionviaje.component.html',
  styleUrls: ['./gestionviaje.component.css']
})
export class GestionviajeComponent implements OnInit {
  viajeForm: FormGroup;

  estaciones: any[] = [];
  horarios: any[] = [];
  zonas: any[] = [];

  estacionActualIndex: number = 0;
  direccion: 'ida' | 'vuelta' = 'ida';
  nombreEstacionActual: string = '';
  mensajeViaje: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private zonaService: ZonaturisticaService,
    private horarioService: HorarioService
  ) {
    this.viajeForm = this.fb.group({
      estacionId: ['', Validators.required],
      horarioId: ['', Validators.required],
      zonaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/estacion').subscribe(data => {
      this.estaciones = data;
      this.actualizarNombreEstacion();
      this.iniciarAnimacionTren();
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

      if (estacionSeleccionadaId == estacionActualId) {
        this.mensajeViaje = '🚆 ¡Buen viaje! El tren está en la estación seleccionada.';
      } else {
        const estacionActualNombre = this.estaciones[this.estacionActualIndex]?.estNom || 'otra estación';
        this.mensajeViaje = `⏳ El tren actualmente se encuentra en "${estacionActualNombre}". Por favor, espere su llegada.`;
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
}
