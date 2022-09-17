
import { UserModel } from './renter-info.model';
export interface RenterStateModel {
    user: UserModel;
    searchCriteria: SearchCriteria;
    welcomeForm: WelcomeForm;
}

export interface WelcomeForm {
    model: any;
    dirty: boolean;
    status: string;
    errors: any;
}

export interface SearchCriteria {
    searchLocation: string;
}
