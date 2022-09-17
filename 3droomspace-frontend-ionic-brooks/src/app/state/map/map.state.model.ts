
export interface MapStateModel {
    centerCoordinates: Coords;
    mapBounds: MapBounds;
    zoom: number;
}

export interface Coords {
    longitude: number;
    latitude: number;
}

export interface MapBounds {
    northEast: Coords;
    southWest: Coords;
}