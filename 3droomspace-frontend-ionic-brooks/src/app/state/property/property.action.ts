import { Property, AddrObj } from './property.state.model';
import { MapStateModel } from '../map/map.state.model';

export class GetProperties {
  static readonly type = '[Property] Get Properties';
  constructor(public mapState: MapStateModel) { }
}

export class SetSelectedProperty {
  static readonly type = '[Property] Set Selected Property';
  constructor(public id: string) { }
}

export class AddNewProperty {
  static readonly type = '[Property] Add New Property';
  constructor(public property: Property & { userId: string, addrObj: AddrObj, photos: string[] }) { }
}
