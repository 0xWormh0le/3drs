import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngxs/store';
import { LoginRenter } from 'src/app/state/auth/auth.action';
import { Navigate } from '@ngxs/router-plugin';
import { GetProperties } from 'src/app/state/property/property.action';
import { UpdateRenterInfo } from 'src/app/state/renter/renter.actions';
import { UserModel } from 'src/app/state/renter/renter-info.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;
  private demoRenterInfo: UserModel;

  constructor(
    private fb: FormBuilder,
    private store: Store,
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.setDemoRenterInfo()
  }

  login() {
    if (this.loginForm.value.username === 'dan@test.com') {
      this.store.dispatch(new Navigate(['/welcome-slides']));
      this.store.dispatch(new UpdateRenterInfo(this.demoRenterInfo));
    } else {
      this.store.dispatch(new LoginRenter(this.loginForm.value.username, this.loginForm.value.password)).subscribe(data => {
        this.store.dispatch(new Navigate(['/welcome-slides']));
      });
    }
  }

  setDemoRenterInfo() {
    this.demoRenterInfo = {
      created_date: 'string',
      active: true,
      id: 'tresdfsdfsdfs',
      propMgmtCoId: 'string',
      user_type: 'LANDLORD',
      first_name: 'Dan',
      middle_name: 'string',
      last_name: 'Lowenberg',
      email: 'dan@test.com',
      email_alt: 'string',
      phone: '(203) 334-8412',
      phone_alt: 'string',
      avatar_url: 'string',
      address: 'string',
      dob: 'string',
      relationship_status: '',
      gender: 'male',
      lifestyle: 'string',
      credit_score: 'string',
      credit_score_date: 'string',
      rental_score: 'string',
      rental_score_date: 'string',
    };
  }
}
