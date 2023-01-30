import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Rutas
import { AppRoutingModule } from '../routes/app-routing.module';
// Animaciones
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Angular Material
import { MaterialModule } from '../modules/material.module';
// Componentes
import { SearchInputComponent } from './search-input/search-input.component';
import { MenuSidenavComponent } from './menu-sidenav/menu-sidenav.component';

@NgModule({
  declarations: [
      SearchInputComponent,
      MenuSidenavComponent
    ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  exports: [
    SearchInputComponent,
    MenuSidenavComponent
  ]
})
export class ComponentsModule { }
