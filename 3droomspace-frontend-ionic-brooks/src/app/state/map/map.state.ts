import { State, StateContext, Action, Selector } from '@ngxs/store';
import { MapStateModel } from './map.state.model';
import { SetMapLocation } from './map.action';


@State({
  name: 'map'
})
export class MapState {

  @Selector()
  static mapLocation(state: MapStateModel) {
    return state;
  }


  @Action(SetMapLocation)
  updateRenterInfo(ctx: StateContext<MapStateModel>, mapState: MapStateModel) {
    ctx.setState(state => {
      return { ...state, mapState };
    });
  }
}
