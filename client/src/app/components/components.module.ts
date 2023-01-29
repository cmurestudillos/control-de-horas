import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Rutas
import { AppRoutingModule } from '../routes/app-routing.module';
// Animaciones
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Angular Material
import { MaterialModule } from '../modules/material.module';
// Componentes
import { SearchInputComponent } from './search-input/search-input.component';

@NgModule({
  declarations: [SearchInputComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
  ],
  exports: [SearchInputComponent]
})
export class ComponentsModule { }
