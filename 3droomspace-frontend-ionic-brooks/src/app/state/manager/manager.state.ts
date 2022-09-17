import { State, StateContext, Action, Selector } from '@ngxs/store';
import { ManagerStateModel } from './manager.state.model';
import { SetManagerView, ClearManagerForm } from './manager.action';


@State({
  name: 'manager',
  defaults: {
      managerView: false,
      listPropertyForm: {
        model: undefined,
        dirty: false,
        status: '',
        errors: {}
    }
  }
})
export class ManagerState {

  @Selector()
  static managerView(state: ManagerStateModel) {
    return state.managerView;
  }


  @Action(SetManagerView)
  updateRenterInfo(ctx: StateContext<ManagerStateModel>, managerView: boolean) {
      ctx.setState(state => ({ ...state, managerView }));
  }
}
