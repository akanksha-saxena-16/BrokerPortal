import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthDTO } from 'src/app/BP.Models';
import { isNullOrUndefined } from 'util';
import { Errors } from 'src/app/BP.Shared';
import { SecurityService } from 'src/app/BP.Services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html'
})
export class SigninComponent {
  isSubmitting = false;
  authForm: FormGroup;
  errors: Errors = {errors: {}};

  constructor(
    private router: Router,
    private securityService: SecurityService,
    private fb: FormBuilder
  ) {
    // use FormBuilder to create a form group
    this.authForm = this.fb.group({
      'userName': ['', Validators.required],
      'password': ['', Validators.required]
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {errors: {}};
    
    const credentials: AuthDTO = this.authForm.value;
    credentials.password = btoa(credentials.password);
    this.securityService
    .attemptAuth(credentials)
    .subscribe(
      res => {
        if (isNullOrUndefined(res.error)){
          this.router.navigateByUrl('/Portal/');
        }
      },
      err => {
        this.errors = {errors : {'' : err.message}};
        this.isSubmitting = false;
      }
    );
  }
}
