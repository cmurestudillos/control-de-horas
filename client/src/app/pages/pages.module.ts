import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../routes/app-routing.module';
// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Animaciones
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Angular Material
import { MaterialModule } from '../modules/material.module';
// Componentes
import { ComponentsModule } from '../components/components.module';
// Pantallas
import { LoginComponent } from './login/login.component';
import { TareasComponent } from './tareas/tareas.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AccionesComponent } from './acciones/acciones.component';
import { ProyectosComponent } from './proyectos/proyectos.component';

@NgModule({
  declarations: [
    LoginComponent,
    TareasComponent,
    ClientesComponent,
    ProyectosComponent,
    AccionesComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: []
})
export class PagesModule { }
