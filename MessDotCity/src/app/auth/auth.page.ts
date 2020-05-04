import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  mode = 'Sign In';
  registerForm: FormGroup;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private authService: AuthService,
              private router: Router,
              private platform: Platform) { }

  ngOnInit() {
    this.createLoginForm();
    this.createRegisterForm();
  }
  ionViewWillEnter() {
   }

  // Initializing the forms
  createLoginForm() {
    this.loginForm = this.fb.group({
      mobile: ['+8801'],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)] ]
    }, {
      validators: [this.mobileBDValidators]
    });
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(10)]],
      lastName: ['', [Validators.required, Validators.maxLength(10)]],
      mobile: ['+8801', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)] ],
      confirmPassword: ['', Validators.required]
    }, {
      validators: [this.passwordMatchValidators, this.mobileBDValidators]
    });
  }

  passwordMatchValidators(g: FormGroup) {
    return g.get('password').value === g.get('confirmPassword').value ? null : {mismatch: true};
  }

  mobileBDValidators(g: FormGroup) {
    // sample regular expression /^([a-z0-9]{5,})$/
    return (/^\+8801\d{9}$/.test(g.get('mobile').value.toString())) ? null : {isInvalidBd: true};
  }

  // switching between register and login mode
  switchMode() {
    if (this.mode === 'Sign In') {
      this.mode = 'Sign Up';
    } else {
      this.mode = 'Sign In';
    }
  }

  isLoginMode() {
    if (this.mode === 'Sign In') {
      return true;
    }
    return false;
  }

  login() {
    // console.log(this.loginForm);
    const model = {
      mobile: this.loginForm.get('mobile').value,
      password: this.loginForm.get('password').value
    };
    this.authService.login(model).subscribe(next => {
      console.log('logged in successfully');
      this.router.navigateByUrl('/dashboard');
    }, err => console.log(err));
  }

  register() {
    const model = {
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      mobile: this.registerForm.get('mobile').value,
      password: this.registerForm.get('password').value
    }
    this.authService.register(model).subscribe(res => {
      console.log('Registration successful');
    }, err => console.log(err),
    () => {
      this.authService.login(model).subscribe(() => {
        this.router.navigateByUrl('/dashboard');
      });
    });
  }

}
