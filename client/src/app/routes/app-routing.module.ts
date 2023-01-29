import { NgModule } from '@angular/core';
// Componentes de Enrutamiento
import { RouterModule, Routes } from '@angular/router';
// Pantallas
import { LoginComponent } from '../pages/login/login.component';
import { TareasComponent } from '../pages/tareas/tareas.component';
import { ClientesComponent } from '../pages/clientes/clientes.component';
import { ProyectosComponent } from '../pages/proyectos/proyectos.component';
import { AccionesComponent } from '../pages/acciones/acciones.component';
// Helpers
import { AuthGuard } from '../helpers/auth.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'tareas', component: TareasComponent, canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard] },
  { path: 'proyectos', component: ProyectosComponent, canActivate: [AuthGuard] },
  { path: 'acciones', component: AccionesComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
