import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from '../../state/auth/auth.state';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  public logo = '../../../assets/img/logo.png';
  constructor(public router: Router, private store: Store) { }

  ngOnInit() {
    const isAuthenticated = this.store.selectSnapshot(AuthState.isLoggedIn);
    if (isAuthenticated) {
      this.router.navigateByUrl('/tabs/map');
    }
  }

  goToSignUp() {
    this.router.navigateByUrl('/sign-up');
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }

}
