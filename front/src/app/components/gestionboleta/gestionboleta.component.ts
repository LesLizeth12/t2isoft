import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertifyService } from 'src/app/core/alertify.service';
import { Boleta } from 'src/app/models/BoletaModel';
import { Empleado } from 'src/app/models/HorarioModel';
import { Usuario } from 'src/app/models/UsuarioModel';
import { BoletaService } from 'src/app/services/estacion.service';
import { EmpleadoService } from 'src/app/services/horario.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-gestionboleta',
  templateUrl: './gestionboleta.component.html',
  styleUrls: ['./gestionboleta.component.css']
})
export class GestionboletaComponent implements OnInit{
  boletas: Boleta[] = [];
  empleados: Empleado[] = [];
  usuarios: Usuario[] = [];
  //BoletaForm: FormGroup;
  boletasCombinados: any[] = [];
  boletasCombinados2: any[] = [];
  constructor(private boletaservice: BoletaService, private empleadoservice: EmpleadoService, private usuarioService: UsuarioService, private router: Router, private alertify: AlertifyService) {
   
  }

  ngOnInit(): void {
    this.loadEmpleados();
    this.loadUsuarios();
    this.loadBoletas();
    
  }

  loadBoletas() {
    this.boletaservice.getBoletas().subscribe(
      (response) => {
        this.boletas = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        //this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadEmpleados() {
    this.empleadoservice.getEmpleados().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.empleados = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
        //this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  loadUsuarios() {
    this.usuarioService.getUsuarios().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.usuarios = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
        //this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }
  /*
  getEmpleadoNombre(id_Empleado: number): string {
    const cat = this.empleados.find(c => c.id === id_Empleado);
    return cat ? cat.nombre : 'Sin Empleado';
  }
    */



  combineData(): void {
    if (this.boletas.length > 0 && this.empleados.length > 0 && this.usuarios.length > 0) {
      const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
      const empleadoId = usuario.usuarioEmpId;
  
      this.boletasCombinados = this.boletas
        .filter(boleta => boleta.bolEmpId === empleadoId) // Filtrar por el empleado logueado
        .map(boleta => {
          const empleado = this.empleados.find(emp => emp.id === boleta.bolEmpId);
          const usuarioData = this.usuarios.find(u => u.id === boleta.bolUsuarioId);
          const usuarioEmpleado = this.empleados.find(emp => emp.id === usuarioData?.usuarioEmpId);
  
          return {
            ...boleta,
            empleadoNombres: empleado?.empNombres ?? 'Sin Empleado',
            usuarioNombres: usuarioEmpleado?.empNombres ?? 'Sin Usuario',
          };
        });
    }
  }
}
