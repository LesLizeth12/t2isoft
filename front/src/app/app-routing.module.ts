import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestionareaComponent } from './components/gestionarea/gestionarea.component';
import { GestiontipousuarioComponent } from './components/gestiontipousuario/gestiontipousuario.component';
import { GestionempleadoComponent } from './components/gestionempleado/gestionempleado.component';
import { GestionusuarioComponent } from './components/gestionusuario/gestionusuario.component';
import { GestionboletaComponent } from './components/gestionboleta/gestionboleta.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { GestionpagoComponent } from './components/gestionpago/gestionpago.component';

const routes: Routes = [
  {path:'area',component:GestionareaComponent}, //NOMBRE A LLAMAR EN LA URL
  {path:'',redirectTo:'/login',pathMatch:'full'} ,
  {path:'tipo',component:GestiontipousuarioComponent},
  {path:'empleado',component:GestionempleadoComponent},
  {path:'usuario',component:GestionusuarioComponent},
  {path:'boleta',component:GestionboletaComponent},
  {path:'index',component:IndexComponent},
  {path:'login',component:LoginComponent},
  {path:'pago',component:GestionpagoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
