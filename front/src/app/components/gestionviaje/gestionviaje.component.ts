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
export class GestionviajeComponent implements OnInit{
  viajeForm: FormGroup;

  estaciones: any[] = [];
  horarios: any[] = [];
  zonas: any[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private zonaService: ZonaturisticaService
  ) {
    this.viajeForm = this.fb.group({
      estacionId: ['', Validators.required],
      horarioId: ['', Validators.required],
      zonaId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.http.get<any[]>('http://localhost:3000/api/estacion').subscribe(data => this.estaciones = data);
    this.http.get<any[]>('http://localhost:3000/api/horario').subscribe(data => this.horarios = data);
    // No cargamos todas las zonas, se cargan dinámicamente según estación
  }

  onEstacionChange(): void {
    const estacionId = this.viajeForm.get('estacionId')?.value;
    if (estacionId) {
      this.zonaService.getZonasByIdEstacion(estacionId).subscribe(
        (response: any) => {
          this.zonas = response.data.zonas; // accede a zonas del objeto data
          this.viajeForm.get('zonaId')?.setValue('');
        },
        error => {
          console.error('Error al obtener zonas por estación', error);
          this.zonas = [];
        }
      );
    }
  }

  reservarViaje(): void {
    if (this.viajeForm.valid) {
      console.log('🟢 Reservando viaje con:', this.viajeForm.value);
      // Aquí podrías hacer un POST a un endpoint como /api/viajes
    } else {
      console.log('🔴 Formulario inválido');
    }
  }
}
