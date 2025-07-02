import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GestionusuarioComponent } from './components/gestionusuario/gestionusuario.component';
import { GestiontipousuarioComponent } from './components/gestiontipousuario/gestiontipousuario.component';
import { TipousuarioFormComponent } from './components/gestiontipousuario/tipousuario-form/tipousuario-form.component';
import { UsuarioFormComponent } from './components/gestionusuario/usuario-form/usuario-form.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { GestionestacionComponent } from './components/gestionestacion/gestionestacion.component';
import { EstacionFormComponent } from './components/gestionestacion/estacion-form/estacion-form.component';
import { GestionclimaComponent } from './components/gestionclima/gestionclima.component';
import { GestionhorarioComponent } from './components/gestionhorario/gestionhorario.component';
import { HorarioFormComponent } from './components/gestionhorario/horario-form/horario-form.component';
import { GestionzonaComponent } from './components/gestionzonaturistica/gestionzonaturistica.component';
import { GestionviajeComponent } from './components/gestionviaje/gestionviaje.component';
import { ZonaFormComponent } from './components/gestionzonaturistica/zonaturistica-form/zonaturistica-form.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    GestionusuarioComponent,
    GestiontipousuarioComponent,
    TipousuarioFormComponent,
    UsuarioFormComponent,
    NavbarComponent,
    IndexComponent,
    LoginComponent,
    GestionestacionComponent,
    EstacionFormComponent,
    GestionclimaComponent,
    GestionhorarioComponent,
    HorarioFormComponent,
    GestionzonaComponent,
    ZonaFormComponent,
    GestionviajeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    NgbModalModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
