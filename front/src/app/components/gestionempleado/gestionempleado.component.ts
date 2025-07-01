import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { Empleado } from 'src/app/models/EmpleadoModel';
import { Area } from 'src/app/models/AreaModel';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { AreaService } from 'src/app/services/area.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-gestionempleado',
  templateUrl: './gestionempleado.component.html',
  styleUrls: ['./gestionempleado.component.css']
})
export class GestionempleadoComponent implements OnInit {
  @ViewChild('empleadoModal') empleadoModal?: EmpleadoFormComponent;
  empleados: Empleado[] = [];
  areas: Area[] = [];
  empleadoForm: FormGroup;
  empleadosCombinados: any[] = [];
  empleadosCombinados2: any[] = [];
  constructor(private empleadoService: EmpleadoService, private areaService: AreaService, private fb: FormBuilder, private modalService: NgbModal, private router: Router, private alertify: AlertifyService) {
    this.empleadoForm = this.fb.group({
      id: [''],
      empDni: [''],
      empApePat: [''],
      empApeMat: [''],
      empNombres: [''],
      empGenero: [''],
      empCorreo: [''],
      empAreaId: [''],
      empContrato: [''],
      empFecInicio: [''],
      empFecFin: [''],
      empJornada: [''],
      empFecNac: ['']
    })
  }

  ngOnInit(): void {
    this.loadEmpleados();
    this.loadAreas();
  }

  loadEmpleados() {
    this.empleadoService.getEmpleados().subscribe(
      (response) => {
        this.empleados = response;
        this.combineData(); // Combina los datos después de cargar los usuarios
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }

  openModalEmpleado(empleado?: Empleado) {
    const modalRef = this.modalService.open(EmpleadoFormComponent);
    console.log(empleado);
    if (empleado) {
      modalRef.componentInstance.empleado = empleado;
      modalRef.componentInstance.isEditMode = true;
    }

    modalRef.result.then((result) => {
      if (result) {
        if (result.id) {
          this.empleadoService.updateEmpleado(result.id, result).subscribe({
            next: () => {
              this.loadEmpleados(); // this.loadPersons()
              this.alertify.success('Empleado Actualizado!');
            },
            error: (err) => {
              console.error('Error al actualizar Empleado:', err);
              this.alertify.error('Ocurrió un error al actualizar la Empleado.');
            },
          });
        } else {
          this.empleadoService.createEmpleado(result).subscribe({
            next: () => {
              this.loadEmpleados(); // this.loadPersons()
              this.alertify.success('¡Empleado Agregado!');
            },
            error: (err) => {
              console.error('Error al agregar Empleado:', err);
              this.alertify.error('Ocurrió un error al agregar la Empleado..');
            },
          });
        }
        this.empleadoForm.reset();
      }
    });
  }

  resetForm() {
    this.empleadoForm.reset();
  }

  deleteEmpleado(id: number) {
    this.alertify.confirm2(
      '¿Estás seguro de que deseas eliminar este empleado?',
      () => {
        this.empleadoService.deleteEmpleado(id).subscribe(() => {
          this.loadEmpleados();
          this.alertify.error('¡Empleado Eliminado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Eliminar Empleado',
      }
    );
  }

  restoreEmpleado(id: number) {
    this.alertify.confirm2(
      '¿Estas seguro de habilitar el registro?',
      () => {
        this.empleadoService.restoreEmpleado(id).subscribe(() => {
          this.loadEmpleados();
          this.alertify.success('¡Empleado Habilitado!');
        });
      },
      () => {
        // Acción a realizar si se cancela
        console.log('Acción cancelada');
      },
      {
        okText: 'Sí',
        cancelText: 'Cancelar',
        title: 'Habilitar Empleado',
      }
    );
  }

  loadAreas() {
    this.areaService.getAreas().subscribe( //subscribe:PARA RESPUESTAS ASINCRONAS
      (response) => {
        this.areas = response;
        this.combineData(); // Combina los datos después de cargar los tipos de usuario
        this.combineData2();
      },
      (error) => console.error("error en el loading", error)
    );
  }
  /*
  getAreaNombre(id_area: number): string {
    const cat = this.areas.find(c => c.id === id_area);
    return cat ? cat.nombre : 'Sin Area';
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
    if (this.empleados.length > 0 && this.areas.length > 0) {
      this.empleadosCombinados = this.empleados.filter(empleado => {
        const area = this.areas.find(a => a.id === empleado.empAreaId);
        // Verifica si los tres registros tienen estado "0"
        return empleado.estado === '1' && area?.estado === '1';
      }).map(empleado => {
        const area = this.areas.find(a => a.id === empleado.empAreaId);

        return {
          ...empleado, // Agrega los datos del usuario
          areaNombre: area?.areaNom ?? 'Sin Area',
          areaSueldo: area?.areaSalario ?? 'Sin Sueldo',
          edad: this.calcularEdad(empleado.empFecNac),
          antiguedad: this.calcularAntiguedad(empleado.empFecInicio)
        };
      });
    }

  }

  combineData2(): void {
    if (this.empleados.length > 0 && this.areas.length > 0) {
      this.empleadosCombinados2 = this.empleados.filter(empleado => {
        const area = this.areas.find(c => c.id === empleado.empAreaId);

        // Verifica si los tres registros tienen estado "0"
        return empleado.estado === '0' && area?.estado === '1';
      }).map(empleado => {
        const area = this.areas.find(c => c.id === empleado.empAreaId);

        return {
          ...empleado, // Agrega los datos del usuario
          areaNombre: area?.areaNom ?? 'Sin Area',
          edad: this.calcularEdad(empleado.empFecNac),
          antiguedad: this.calcularAntiguedad(empleado.empFecInicio)
        };
      });
    }
  }

}
