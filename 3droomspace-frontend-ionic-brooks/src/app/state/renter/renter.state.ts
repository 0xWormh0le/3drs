import { State, StateContext, Action, Selector } from '@ngxs/store';
import { UpdateRenterInfo, WelcomeFormSubmitted, UpdatePriceRange } from './renter.actions';
import { RenterStateModel, WelcomeForm } from './renter.state.model';

@State({
  name: 'renter',
  defaults: {
    welcomeForm: {
      model: undefined,
      dirty: false,
      status: '',
      errors: {}
    }
  }
})
export class RenterState {

  @Selector()
  static userInfo(state: RenterStateModel) {
    return state.user;
  }

  @Selector()
  static welcomeForm(state: RenterStateModel): WelcomeForm {
    return state.welcomeForm;
  }


  @Action(UpdateRenterInfo)
  updateRenterInfo(ctx: StateContext<RenterStateModel>, { renterInfo }: UpdateRenterInfo) {
    ctx.setState(state => ({ ...state, user: renterInfo }));
  }

  @Action(UpdatePriceRange)
  updatePriceRange(ctx: StateContext<RenterStateModel>, { minMax }: { minMax: { lower: number, upper: number } }) {
    console.log(ctx, minMax);
    ctx.setState(state => ({
      ...state,
      welcomeForm: {
        ...state.welcomeForm,
        model: {
          ...state.welcomeForm.model,
          desiredPrice: { lower: minMax.lower, upper: minMax.upper }
        }
      }
    }
    ));
  }

  @Action(WelcomeFormSubmitted)
  welcomeFormSubmitted(ctx: StateContext<RenterStateModel>) {
    const state = ctx.getState();
    console.log('state = ');
    console.log(state.welcomeForm.model);
  }
}
