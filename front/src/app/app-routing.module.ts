import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestiontipousuarioComponent } from './components/gestiontipousuario/gestiontipousuario.component';
import { GestionusuarioComponent } from './components/gestionusuario/gestionusuario.component';
import { GestionboletaComponent } from './components/gestionboleta/gestionboleta.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  //{path:'',redirectTo:'/login',pathMatch:'full'} ,
  {path:'tipo',component:GestiontipousuarioComponent},
  {path:'usuario',component:GestionusuarioComponent},
  {path:'boleta',component:GestionboletaComponent},
  //{path:'index',component:IndexComponent},
  //{path:'login',component:LoginComponent},
  //{path:'pago',component:GestionpagoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
