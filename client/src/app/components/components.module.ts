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
import { SearchDateComponent } from './search-date/search-date.component';
import { MenuSidenavComponent } from './menu-sidenav/menu-sidenav.component';
import { AlertsComponent } from './alerts/alerts.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
      SearchInputComponent,
      SearchDateComponent,
      MenuSidenavComponent,
      AlertsComponent,
      HeaderComponent
,    ],
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
    SearchDateComponent,
    MenuSidenavComponent,
    AlertsComponent,
    HeaderComponent
  ]
})
export class ComponentsModule { }
