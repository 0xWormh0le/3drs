import { RenterRegistrationForm } from 'src/app/models/register-form';

export class RegisterRenter {
    static readonly type = '[Auth] Register Renter';
    constructor(public renterRegistrationForm: RenterRegistrationForm) {}
  }

export class LoginRenter {
    static readonly type = '[Auth] Login Renter';
    constructor(public username: string, public password: string) {}
  }

export class UpdateToken {
    static readonly type = '[Auth] Update token';
    constructor(public token: string) {}
}
