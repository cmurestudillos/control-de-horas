import { Component, OnDestroy, OnInit } from '@angular/core';
// Formularios
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// Operadores y Observables
import { Subscription } from 'rxjs';
// Servicios
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  hide: boolean = true;

  private subscriptions: Subscription[] = [];

  constructor(public fb: FormBuilder,public authService: AuthService) {
      this.loginForm = this.fb.group({
        email: new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")]),
        password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      });
    }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  login(): void {
    this.authService.iniciarSesion(this.loginForm.value);
  }

}
