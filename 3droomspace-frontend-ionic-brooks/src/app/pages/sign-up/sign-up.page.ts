import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { RenterRegistrationForm } from '../../models/register-form';
import { Store } from '@ngxs/store';
import { RegisterRenter } from 'src/app/state/auth/auth.action';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  public signUpForm: FormGroup;
  private mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store
  ) {
    this.signUpForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  createAccount() {
    const registrationInfo: RenterRegistrationForm = {
      first_name: this.signUpForm.value.first_name,
      last_name: this.signUpForm.value.last_name,
      phone: this.signUpForm.value.phone,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      user_type: 'LANDLORD',
      created_by: 'system'
    };
    this.store.dispatch(new RegisterRenter(registrationInfo)).subscribe(data => {
      this.store.dispatch(new Navigate(['/login']));
      this.signUpForm.reset();
    });

  }

}
