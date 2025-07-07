import { Component, OnInit, ViewChild } from '@angular/core';
import { Estacion } from 'src/app/models/EstacionModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EstacionService } from 'src/app/services/estacion.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';
import { Usuario } from 'src/app/models/UsuarioModel';
import { ZonaTuristica } from 'src/app/models/ZonaTuristicaModel';
import { Horario } from 'src/app/models/HorarioModel';
import { ZonaturisticaService } from 'src/app/services/zonaturistica.service';
import { HorarioService } from 'src/app/services/horario.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InformeService } from 'src/app/services/informe.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-gestionpreferencia',
  templateUrl: './gestionpreferencia.component.html',
  styleUrls: ['./gestionpreferencia.component.css']
})
export class GestionpreferenciaComponent implements OnInit {
  preferencias: any[] = [];
  estacions: Estacion[] = [];
  usuarios: Usuario[] = [];
  zonas: ZonaTuristica[] = [];
  horarios: Horario[] = [];
  preferenciasCombinados: any[] = [];


  constructor(private informeService: InformeService, private estacionService: EstacionService, private horarioService: HorarioService, private zonaService: ZonaturisticaService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.loadPreferencias();
    this.loadHorarios();
    this.loadEstacions();
    this.loadUsuarios();
    this.loadZonas();
  }

  loadPreferencias() {
    this.informeService.getInformes().subscribe(
      (response) => {
        this.preferencias = response;
        this.combineData();
      },
      (error) => console.error("error al cargar preferencias", error)
    );
  }

  loadHorarios() {
    this.horarioService.getHorarios().subscribe(
      (response) => {
        this.horarios = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadEstacions() {
    this.estacionService.getEstacions().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.estacions = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadZonas() {
    this.zonaService.getZonaTuristicas().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.zonas = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.usuarios = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
      },
      (error) => console.error("error en el loading", error)
    );
  }

  combineData(): void {
    if (this.preferencias.length > 0 && this.estacions.length > 0 && this.zonas.length > 0 && this.horarios.length > 0 && this.usuarios.length > 0) {
      this.preferenciasCombinados = this.preferencias.filter(preferencia => {
        const estacion = this.estacions.find(a => a.Id === preferencia.InfEstId);
        const zona = this.zonas.find(a => a.Id === preferencia.InfZonaId);
        const horario = this.horarios.find(a => a.Id === preferencia.InfHorId);
        const usuario = this.estacions.find(a => a.Id === preferencia.InfUsuId);
        // Verifica si los tres registros tienen Estado "0"
        return estacion?.Estado === '1';
      }).map(preferencia => {
        const estacion = this.estacions.find(a => a.Id === preferencia.InfEstId);
        const zona = this.zonas.find(a => a.Id === preferencia.InfZonaId);
        const horario = this.horarios.find(a => a.Id === preferencia.InfHorId);
        const usuario = this.usuarios.find(a => a.Id === preferencia.InfUsuId);
        return {
          ...preferencia, // Agrega los datos del usuario
          estacionNombre: estacion?.EstNombre ?? 'Sin Estacion',
          zonaNombre: zona?.ZonaNombre ?? 'Sin zona',
          horarioSalida: horario?.HorSalida ?? 'Sin salida',
          horarioLlegada: horario?.HorLlegada ?? 'Sin llegada',
          horarioPrecio: horario?.HorPrecio ?? '0.00',
          usuarioNombre: usuario?.UsuNombres ?? 'Sin usuario'
        };
      });
    }

  }

  exportToExcel(): void {
    const exportData = this.preferenciasCombinados.map(p => ({
      ESTACION: p.estacionNombre,
      ZONA: p.zonaNombre,
      HORARIO: `${p.horarioSalida} - ${p.horarioLlegada} (S/. ${p.horarioPrecio})`,
      USUARIO: p.usuarioNombre
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);
    const workbook: XLSX.WorkBook = { Sheets: { 'Preferencias': worksheet }, SheetNames: ['Preferencias'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    const blob: Blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
    });
    FileSaver.saveAs(blob, 'preferencias.xlsx');
  }

}
