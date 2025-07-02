import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestiontipousuarioComponent } from './components/gestiontipousuario/gestiontipousuario.component';
import { GestionusuarioComponent } from './components/gestionusuario/gestionusuario.component';
import { GestionestacionComponent } from './components/gestionestacion/gestionestacion.component';
import { GestionclimaComponent } from './components/gestionclima/gestionclima.component';
import { GestionhorarioComponent } from './components/gestionhorario/gestionhorario.component';
import { GestionzonaComponent } from './components/gestionzonaturistica/gestionzonaturistica.component';
import { GestionviajeComponent } from './components/gestionviaje/gestionviaje.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'} ,
  {path:'tipo',component:GestiontipousuarioComponent},
  {path:'usuario',component:GestionusuarioComponent},
  {path:'estacion',component:GestionestacionComponent},
  {path:'clima',component:GestionclimaComponent},
  {path:'horario',component:GestionhorarioComponent},
  {path:'zona',component:GestionzonaComponent},
  {path:'index',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'viaje',component:GestionviajeComponent},
  //{path:'pago',component:GestionpagoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
