import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/UsuarioModel';
import { UsuarioService } from 'src/app/services/usuario.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuarioFormComponent } from '../gestionusuario/usuario-form/usuario-form.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario: Usuario | undefined;
  constructor(private modalService: NgbModal, private fb: FormBuilder, private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UsuNombre: ['', Validators.required],
      UsuPassword: ['', [Validators.required]]
    });
  }

  abrirModalCrearCuenta(): void {
    try {
      this.modalService.open(UsuarioFormComponent, {
        size: 'lg',
        backdrop: 'static',
        keyboard: false,
      });
    } catch (e) {
      console.error('Error abriendo el modal', e);
    }
  }

  get UsuNombre() {
    return this.loginForm.get('UsuNombre');
  }

  get UsuPassword() {
    return this.loginForm.get('UsuPassword');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marca campos como tocados para mostrar errores
      return;
    }
    // if (this.loginForm.valid) {
    const formData = this.loginForm.value;
    console.log('Usuario:', formData.UsuNombre);
    console.log('Contraseña:', formData.UsuPassword);
    this.userService.login(formData.UsuNombre).subscribe(data => {
      console.log(data);
      if (data.UsuPassword == formData.UsuPassword) {
        console.log('RAAA CSMR');
        localStorage.setItem('usuario', JSON.stringify(data)); // Guarda todo el objeto
        localStorage.setItem('usuarioId', data.Id.toString()); // <-- AGREGA ESTA LÍNEA
        localStorage.setItem('tipoUsuario', data.UsuTipoId.toString());
        this.router.navigate(['/index']);
      } else {
        alert('Contraseña incorrecta'); // Aquí podrías mostrar un mensaje más elegante
      }
    }, error => {
      alert('Usuario no encontrado');
    });


    //   // Aquí puedes manejar la autenticación (por ejemplo, enviando a un backend)
    // }
  }
}
