import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private authService: AuthService, private router: Router) {}

  public ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });

    this.signUpForm = new FormGroup({
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
    });
  }

  public onLogin() {
    this.authService.loginUser(this.loginForm.value).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  public onRegister() {
    if (
      this.signUpForm.value.password === this.signUpForm.value.confirm_password
    ) {
      this.authService.registerUser(this.signUpForm.value).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
}
