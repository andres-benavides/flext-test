import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    try {
      const token = await this.authService.login({ email, password });
      if (token) {
        this.authService.saveToken(token);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'Credenciales incorrectas. Intenta de nuevo.';
        this.snackBar.open(this.errorMessage, 'Cerrar', {
          duration: 5000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
      }
    } catch (error: any) {
      const message =
        error?.error?.message ||
        error?.message ||
        'Ocurrió un error inesperado. Intenta de nuevo.';

      this.snackBar.open(message, 'Cerrar', {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['snackbar-error'],
      });
    }
  }
}
