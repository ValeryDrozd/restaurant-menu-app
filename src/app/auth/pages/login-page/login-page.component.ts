import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  loginForm!: FormGroup;
  signUpForm!: FormGroup;
  loginError: string | null = null;
  registerError: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        () => this.validatePasswordInput(),
      ]),
    });
  }

  public onLogin() {
    if (this.loginForm.valid) {
      this.loginError = null;
      this.authService.loginUser(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.loginError = 'Incorrect email or password!';
          this.loginForm.controls['password'].setValue('');
        },
      });
    }
  }

  public onRegister() {
    if (this.signUpForm.valid) {
      this.registerError = null;
      this.authService.registerUser(this.signUpForm.value).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: () => {
          this.registerError = 'Email has already used!';
        },
      });
    }
  }

  public validatePasswordInput(): {
    passwordsNotMatch: boolean;
  } | null {
    if (
      this.signUpForm?.controls['password'].value !==
      this.signUpForm?.controls['confirmPassword'].value
    ) {
      return {
        passwordsNotMatch:
          this.signUpForm.controls['password'].value !==
          this.signUpForm.controls['confirmPassword'].value,
      };
    }
    return null;
  }
}
