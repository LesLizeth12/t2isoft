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
  climas: any[] = [];
  intervalo: any;

  estadosClima = [
    { nombre: 'Soleado', icono: '☀️' },
    { nombre: 'Nublado', icono: '🌥️' },
    { nombre: 'Lluvia', icono: '🌧️' },
    { nombre: 'Tormenta', icono: '⛈️' },
    { nombre: 'Niebla', icono: '🌫️' },
    { nombre: 'Viento', icono: '💨' }
  ];

  ngOnInit(): void {
    this.generarClimaMesActual();
    this.intervalo = setInterval(() => {
      this.generarClimaMesActual(); // se regenera todo cada 10 segundos
    }, 10000);
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
      const tempMin = this.randomTempMin();
      const tempMax = tempMin + this.randomDelta();
      const tempActual = this.randomTempBetween(tempMin, tempMax);
      const estado = this.estadosClima[Math.floor(Math.random() * this.estadosClima.length)];

      this.climas.push({
        dia: i,
        fecha: fecha.toISOString().split('T')[0],
        estado: estado.nombre,
        icono: estado.icono,
        tempMin,
        tempMax,
        tempActual
      });
    }
  }

  randomTempMin(): number {
    return Math.floor(Math.random() * 10) + 15; // 15°C a 24°C
  }

  randomDelta(): number {
    return Math.floor(Math.random() * 6) + 4; // +4°C a +9°C sobre tempMin
  }

  randomTempBetween(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
