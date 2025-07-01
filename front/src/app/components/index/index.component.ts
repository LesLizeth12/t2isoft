import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/core/alertify.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  constructor(private alertify: AlertifyService) { }
  tipoUsuario: number = 0;

  ngOnInit(): void {
    this.mostrarMensaje();
    const tipo = localStorage.getItem('tipoUsuario');
    if (tipo) {
      this.tipoUsuario = parseInt(tipo, 10);
    }
  }


  mostrarMensaje() {
    this.alertify.message('¡Bienvenidos a nuestro Sitio Web!');
  }
}
