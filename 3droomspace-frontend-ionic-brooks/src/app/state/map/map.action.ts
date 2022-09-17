import { MapStateModel } from './map.state.model';

export class SetMapLocation {
    static readonly type = '[Map] Set Map Location';
    constructor(public mapStateModel: Partial<MapStateModel>) { }
}
