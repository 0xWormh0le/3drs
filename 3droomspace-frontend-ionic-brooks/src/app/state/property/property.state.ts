import { State, StateContext, Action, Selector } from '@ngxs/store';
import { GetProperties, SetSelectedProperty, AddNewProperty } from './property.action';
import { PropertyStateModel, Property } from './property.state.model';
import { PropertyService } from '../../services/property/property.service';
import { Injectable } from '@angular/core';
import { MapStateModel } from '../map/map.state.model';
import { SetMapLocation } from '../map/map.action';

@State({
  name: 'property',
})
@Injectable()
export class PropertyState {
  constructor(
    public propertyService: PropertyService
  ) { }

  @Selector()
  static properties(state: PropertyStateModel) {
    return state.properties;
  }

  @Selector()
  static selectedProperty(state: PropertyStateModel) {
    return state.selectedProperty;
  }

  @Action(GetProperties)
  async getProperties(ctx: StateContext<PropertyStateModel>, mapState: MapStateModel) {
    const fetchProperties = await this.propertyService.getProperties(mapState);

    fetchProperties.subscribe((properties: Property[]) => {
      console.log('properties = ');
      console.log(properties);
      ctx.setState(state => ({ ...state, properties }));
    });
  }

  @Action(SetSelectedProperty)
  setSelectedProperty(ctx: StateContext<PropertyStateModel>, { id }: any) {
    const state = ctx.getState();
    const selectedProperty = state.properties.find(property => property.id === id);
    ctx.patchState({
      selectedProperty
    });
  }

  @Action(AddNewProperty)
  async addNewProperty(ctx: StateContext<PropertyStateModel>, propertyInput: AddNewProperty) {
    const state = ctx.getState();

    ctx.dispatch(new SetMapLocation({
      centerCoordinates: {
        latitude: propertyInput.property.latitude,
        longitude: propertyInput.property.longitude
      },
      zoom: 11
    }));

    const registerProperty = await this.propertyService.addProperty(propertyInput);

    registerProperty.subscribe((property) => {
      console.log(property);
      ctx.patchState({
        ...state,
        properties: [...state.properties, property]
      });
    });
  }
}
