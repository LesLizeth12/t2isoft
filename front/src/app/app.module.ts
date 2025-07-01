import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionareaComponent } from './components/gestionarea/gestionarea.component';
import { GestionempleadoComponent } from './components/gestionempleado/gestionempleado.component';
import { GestionboletaComponent } from './components/gestionboleta/gestionboleta.component';
import { GestionusuarioComponent } from './components/gestionusuario/gestionusuario.component';
import { GestiontipousuarioComponent } from './components/gestiontipousuario/gestiontipousuario.component';
import { AreaFormComponent } from './components/gestionarea/area-form/area-form.component';
import { BoletaFormComponent } from './components/gestionboleta/boleta-form/boleta-form.component';
import { EmpleadoFormComponent } from './components/gestionempleado/empleado-form/empleado-form.component';
import { TipousuarioFormComponent } from './components/gestiontipousuario/tipousuario-form/tipousuario-form.component';
import { UsuarioFormComponent } from './components/gestionusuario/usuario-form/usuario-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { GestionpagoComponent } from './components/gestionpago/gestionpago.component';

@NgModule({
  declarations: [
    AppComponent,
    GestionareaComponent,
    GestionempleadoComponent,
    GestionboletaComponent,
    GestionusuarioComponent,
    GestiontipousuarioComponent,
    AreaFormComponent,
    BoletaFormComponent,
    EmpleadoFormComponent,
    TipousuarioFormComponent,
    UsuarioFormComponent,
    NavbarComponent,
    IndexComponent,
    LoginComponent,
    GestionpagoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
