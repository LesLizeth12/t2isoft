import { Component, OnInit, ViewChild } from '@angular/core';
import { ClimaFormComponent } from './clima-form/clima-form.component';
import { Estacion } from 'src/app/models/EstacionModel';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  climas: any[] = [];
  estaciones: any[] = [];
  estacionSeleccionadaId: number = 0;
  intervalo: any;

  estadosClima = [
    { nombre: 'Soleado', icono: '☀️', rango: [24, 40] },
    { nombre: 'Nublado', icono: '🌥️', rango: [20, 28] },
    { nombre: 'Lluvia', icono: '🌧️', rango: [18, 25] },
    { nombre: 'Tormenta', icono: '⛈️', rango: [17, 22] },
    { nombre: 'Niebla', icono: '🌫️', rango: [15, 22] },
    { nombre: 'Viento', icono: '💨', rango: [16, 24] }
  ];

  constructor(private estacionService: EstacionService) {}

  ngOnInit(): void {
    this.estacionService.getEstacions().subscribe(data => {
      this.estaciones = data;
      this.generarClimaMesActual();
      this.intervalo = setInterval(() => this.generarClimaMesActual(), 10000);
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalo);
  }

  generarClimaMesActual(): void {
    const hoy = new Date();
    const año = hoy.getFullYear();
    const mes = hoy.getMonth();
    const dias = 31;

    this.climas = [];

    for (let i = 1; i <= dias; i++) {
      const fecha = new Date(año, mes, i);
      for (const est of this.estaciones) {
        const tempMin = this.randomTempMin();
        const tempMax = tempMin + this.randomDelta();
        const tempActual = this.randomTempBetween(tempMin, tempMax);
        const estado = this.elegirEstadoPorTemperatura(tempActual);

        this.climas.push({
          dia: i,
          fecha: fecha.toISOString().split('T')[0],
          nombreEstacion: est.estNom,
          climaEstId: est.id,
          estado: estado.nombre,
          icono: estado.icono,
          tempMin,
          tempMax,
          tempActual
        });
      }
    }
  }

  climasFiltrados(): any[] {
    if (this.estacionSeleccionadaId == 0) return this.climas;
    return this.climas.filter(c => c.climaEstId == this.estacionSeleccionadaId);
  }

  randomTempMin(): number {
    return Math.floor(Math.random() * 10) + 15;
  }

  randomDelta(): number {
    return Math.floor(Math.random() * 6) + 4;
  }

  randomTempBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  elegirEstadoPorTemperatura(temp: number): { nombre: string; icono: string } {
    const posibles = this.estadosClima.filter(e =>
      temp >= e.rango[0] && temp <= e.rango[1]
    );
    return posibles[Math.floor(Math.random() * posibles.length)] || this.estadosClima[0];
  }
}
