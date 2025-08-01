import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  tipoUsuario: number = 0;
  ngOnInit(): void {
    const tipo = localStorage.getItem('tipoUsuario');
    if (tipo) {
      this.tipoUsuario = parseInt(tipo, 10);
    }
  }
}
