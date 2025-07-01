import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Area } from 'src/app/models/AreaModel';
import { Boleta } from 'src/app/models/BoletaModel';
import { Empleado } from 'src/app/models/EmpleadoModel';
import { Usuario } from 'src/app/models/UsuarioModel';
import { AreaService } from 'src/app/services/area.service';
import { BoletaService } from 'src/app/services/boleta.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import * as ExcelJS from 'exceljs';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-gestionpago',
  templateUrl: './gestionpago.component.html',
  styleUrls: ['./gestionpago.component.css']
})



export class GestionpagoComponent implements OnInit {
  pagoForm!: FormGroup;
  empleados: Empleado[] = [];
  areas: Area[] = [];
  pago: any = {
    bolEmpId: '0'
  }
  submited = false;

  constructor(
    private fb: FormBuilder,
    private empleadoService: EmpleadoService,
    private areaService: AreaService,
    private boletaService: BoletaService
  ) { }

  ngOnInit(): void {
    this.pagoForm = this.fb.group({
      empleadoId: [this.pago?.bolEmpId || '0', [
        Validators.required,
        (control: AbstractControl) => control.value === '0' ? { invalidPago: true } : null
      ]],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required]
    });

    this.empleadoService.getEmpleados().subscribe(data => this.empleados = data);
    this.areaService.getAreas().subscribe(data => this.areas = data);
  }

  calcularYGuardar(): void {
    const formData = this.pagoForm.value;
    const empleado = this.empleados.find(e => e.id === +formData.empleadoId);
    if (!empleado) return;

    // Corregimos la conversión de fechas para evitar errores de zona horaria
    const [añoI, mesI, diaI] = formData.fechaInicio.split('-').map((v: string) => parseInt(v, 10));
    const fechaInicio = new Date(añoI, mesI - 1, diaI);

    const [añoF, mesF, diaF] = formData.fechaFin.split('-').map((v: string) => parseInt(v, 10));
    const fechaFin = new Date(añoF, mesF - 1, diaF);

    let gratificacion = 0;

    const anioIgual = fechaInicio.getFullYear() === fechaFin.getFullYear();
    const mesIgual = fechaInicio.getMonth() === fechaFin.getMonth();
    const mesEsAbrilOJunio = [6, 11].includes(fechaInicio.getMonth()); // Abril: 3, Junio: 5

    if (anioIgual && mesIgual && mesEsAbrilOJunio) {
      gratificacion = 300;
    }

    const area = this.areas.find(a => a.id === empleado.empAreaId);
    const salarioArea = area?.areaSalario ?? 0;
    const bolTotal = salarioArea + gratificacion;
    const bolEmpId = empleado.id;
    const bolUsuarioId = parseInt(localStorage.getItem('usuarioId') || '0');

    if (!area || !bolUsuarioId) {
      alert('Error al generar la boleta. Verifique los datos.');
      return;
    }

    const nuevaBoleta: Boleta = {
      id: 0,
      bolEmpId,
      bolUsuarioId,
      bolGratificacion: gratificacion,
      bolTotal,
      estado: 'Generado'
    };

    this.boletaService.createBoleta(nuevaBoleta).subscribe(() => {
      alert('Boleta registrada con éxito');
      this.generarExcel(nuevaBoleta, empleado, area, fechaInicio);
      this.pagoForm.reset();
    });
  }

  generarExcel(boleta: Boleta, empleado: Empleado, area: Area, fechaInicio: Date): void {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Boleta');

    const addTitleRow = (title: string) => {
      const row = worksheet.addRow([title]);
      row.font = { bold: true, color: { argb: 'FFFFFFFF' }, size: 14 };
      row.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFEB9F' } // Amarillo opaco que termina en F
      };
      worksheet.mergeCells(`A${row.number}:F${row.number}`);
    };

    const styleHeaderCell = (cell: ExcelJS.Cell) => {
      cell.font = { bold: true, color: { argb: 'FFFFFFFF' } };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF333333' }
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    };

    const nombreMes = fechaInicio.toLocaleString('default', { month: 'long' }).toUpperCase();
    const anio = fechaInicio.getFullYear();
    const boletaMes = `BOLETA DEL MES ${nombreMes} ${anio}`;
    const titleRow = worksheet.addRow([boletaMes]);
    titleRow.font = { bold: true, size: 16, color: { argb: 'FFFFFFFF' } };
    titleRow.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFF660F' } // Anaranjado opaco que termina en F
    };
    worksheet.mergeCells(`A${titleRow.number}:F${titleRow.number}`);

    worksheet.addRow(['Nombres', empleado.empNombres, 'Apellidos', empleado.empApePat, 'DNI', empleado.empDni]);
    worksheet.addRow(['Género', empleado.empGenero, 'Fecha de nacimiento', empleado.empFecNac, 'Edad Actual', this.calcularEdad(empleado.empFecNac)]);

    [2, 3].forEach(rowNum => {
      [1, 3, 5].forEach(colNum => {
        const cell = worksheet.getRow(rowNum).getCell(colNum);
        styleHeaderCell(cell);
      });
    });

    worksheet.addRow([]);
    addTitleRow('Información de Contrato');
    worksheet.addRow(['Área', area.areaNom, 'Fecha de Ingreso', empleado.empFecInicio]);
    worksheet.addRow(['Modalidad', empleado.empContrato, 'Jornada', empleado.empJornada]);
    worksheet.addRow(['Fecha Inicio', empleado.empFecInicio, 'Fecha Fin', empleado.empFecFin]);
    worksheet.addRow(['Tiempo en la Empresa', this.calcularAntiguedad(empleado.empFecInicio)]);

    [6, 7, 8].forEach(rowNum => {
      [1, 3].forEach(colNum => {
        const cell = worksheet.getRow(rowNum).getCell(colNum);
        styleHeaderCell(cell);
      });
    });

    [9].forEach(rowNum => {
      [1].forEach(colNum => {
        const cell = worksheet.getRow(rowNum).getCell(colNum);
        styleHeaderCell(cell);
      });
    });

    worksheet.addRow([]);
    addTitleRow('Información de Salario');
    worksheet.addRow(['Salario por Área', area.areaSalario]);
    worksheet.addRow(['Gratificación de julio o diciembre', boleta.bolGratificacion]);
    worksheet.addRow(['Total', boleta.bolTotal]);

    [12, 13, 14].forEach(rowNum => {
      [1].forEach(colNum => {
        const cell = worksheet.getRow(rowNum).getCell(colNum);
        styleHeaderCell(cell);
      });
    });

    worksheet.columns = [
      { width: 20 }, { width: 20 },
      { width: 20 }, { width: 20 },
      { width: 20 }, { width: 20 }
    ];

    const filaInicioDatos = 2;
    const filaFinal = worksheet.lastRow?.number || 15;
    this.aplicarBordes(worksheet, filaInicioDatos, filaFinal);

    workbook.xlsx.writeBuffer().then(buffer => {
      const blob = new Blob([buffer], { type: 'application/octet-stream' });
      const fileName = `boleta_${empleado.empNombres}_${empleado.empApePat}.xlsx`.replace(/ /g, '_');
      FileSaver.saveAs(blob, fileName);
    });
  }

  private calcularEdad(fechaNacimiento: string): number {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
      edad--;
    }
    return edad;
  }

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

  private aplicarBordes(worksheet: ExcelJS.Worksheet, desdeFila: number, hastaFila: number): void {
    const columnas = ['A', 'B', 'C', 'D', 'E', 'F'];

    for (let i = desdeFila; i <= hastaFila; i++) {
      for (let j = 0; j < columnas.length; j++) {
        const celda = worksheet.getCell(`${columnas[j]}${i}`);
        const esPrimeraColumna = j === 0;
        const esUltimaColumna = j === columnas.length - 1;

        celda.border = {
          top: i === desdeFila ? { style: 'thin', color: { argb: 'FF000000' } } : undefined,
          bottom: i === hastaFila ? { style: 'thin', color: { argb: 'FF000000' } } : undefined,
          left: esPrimeraColumna ? { style: 'thin', color: { argb: 'FF000000' } } : undefined,
          right: esUltimaColumna ? { style: 'thin', color: { argb: 'FF000000' } } : undefined,
        };
      }
    }
  }
}



