import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
// Rutas
import { AppRoutingModule } from './routes/app-routing.module';
// Formularios
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// Angular Material
import { MaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
// Componentes
import { ComponentsModule } from './components/components.module';
// Pantallas
import { PagesModule } from './pages/pages.module';
// Helpers
import { AuthInterceptor } from './helpers/authconfig.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FlexLayoutModule ,
    MaterialModule,
    PagesModule,
    ComponentsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
