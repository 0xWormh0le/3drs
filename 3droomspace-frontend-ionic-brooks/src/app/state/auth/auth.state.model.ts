import { RenterRegistrationForm } from 'src/app/models/register-form';

export interface AuthStateModel {
    loggedIn: boolean;
    token: string;
    renterRegistrationForm?: RenterRegistrationForm;
}
