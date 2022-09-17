import { State, Action, StateContext, Selector } from '@ngxs/store';
import { RegisterRenter, LoginRenter, UpdateToken } from './auth.action';
import { AuthStateModel } from './auth.state.model';
import { RegisterService } from 'src/app/services/register/register.service';
import { tap } from 'rxjs/operators';
import { UpdateRenterInfo } from '../renter/renter.actions';
import { TokenService } from 'src/app/services/token/token.service';
import { Injectable } from '@angular/core';

@State({
    name: 'auth',
    defaults: {
        signUpForm: {
            model: undefined,
            dirty: false,
            status: '',
            errors: {}
        }
    }
})
@Injectable()
export class AuthState {
    constructor(
        public registerService: RegisterService,
        public tokenService: TokenService
    ) { }

    @Selector()
    static isLoggedIn(state: AuthStateModel): boolean {
        return state.loggedIn;
    }



    @Action(RegisterRenter)
    registerRenter(ctx: StateContext<AuthStateModel>, { renterRegistrationForm }: RegisterRenter) {
        ctx.setState(state => ({ ...state, value: renterRegistrationForm }));
        return this.registerService.registerUser(renterRegistrationForm);
    }


    @Action(LoginRenter)
    loginRenter(ctx: StateContext<AuthStateModel>, { username, password }: LoginRenter) {
        return this.registerService.loginUser(username, password).pipe(
            tap(result => {
                ctx.patchState({
                    loggedIn: true
                });
                ctx.dispatch(new UpdateRenterInfo(result.user));
                ctx.dispatch(new UpdateToken(result.access_token));
            })
        );
    }

    @Action(UpdateToken)
    updateToken(ctx: StateContext<AuthStateModel>, { token }: UpdateToken) {
        this.tokenService.saveToken(token).then(() => {
            ctx.patchState({
                token
            });
        }
        ).catch(err => console.log(err));
    }
}
