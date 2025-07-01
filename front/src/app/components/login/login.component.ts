import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/UsuarioModel';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  usuario: Usuario | undefined;
  constructor(private fb: FormBuilder, private userService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      usuarioNom: ['', Validators.required],
      usuarioPass: ['', [Validators.required]]
    });
  }

  get usuarioNom() {
    return this.loginForm.get('usuarioNom');
  }

  get usuarioPass() {
    return this.loginForm.get('usuarioPass');
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marca campos como tocados para mostrar errores
      return;
    }
    // if (this.loginForm.valid) {
    const formData = this.loginForm.value;
    console.log('Usuario:', formData.usuarioNom);
    console.log('Contraseña:', formData.usuarioPass);
    this.userService.login(formData.usuarioNom).subscribe(data => {
      console.log(data);
      if (data.usuarioPass == formData.usuarioPass) {
        console.log('RAAA CSMR');
        localStorage.setItem('usuario', JSON.stringify(data)); // Guarda todo el objeto
        localStorage.setItem('usuarioId', data.id.toString()); // <-- AGREGA ESTA LÍNEA
        localStorage.setItem('tipoUsuario', data.usuarioTipoId.toString());
        this.router.navigate(['/index']);
      }else {
        alert('Contraseña incorrecta'); // Aquí podrías mostrar un mensaje más elegante
      }
    }, error => {
      alert('Usuario no encontrado');
    });


    //   // Aquí puedes manejar la autenticación (por ejemplo, enviando a un backend)
    // }
  }
}
