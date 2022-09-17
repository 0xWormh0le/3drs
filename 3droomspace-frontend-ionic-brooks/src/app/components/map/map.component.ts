import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Navigate } from '@ngxs/router-plugin';
import { Store, Select } from '@ngxs/store';
import { AgmMap, LatLngBounds, LatLng } from '@agm/core';
import { Geolocation } from '@capacitor/core';
import { Observable, Subject } from 'rxjs';
import debounce from 'lodash/debounce';
import { PropertyState } from 'src/app/state/property/property.state';
import { Property } from 'src/app/state/property/property.state.model';
import { first } from 'rxjs/operators';
import { SetManagerView } from 'src/app/state/manager/manager.action';
import { SetSelectedProperty } from 'src/app/state/property/property.action';
import { MapState } from 'src/app/state/map/map.state';
import { MapStateModel, Coords, MapBounds } from 'src/app/state/map/map.state.model';
import { SetMapLocation } from 'src/app/state/map/map.action';
import { GetProperties } from 'src/app/state/property/property.action';

@Component({
  selector: 'app-map-component',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})

export class MapComponent implements OnInit, OnDestroy {
  @Select(PropertyState.properties) properties$: Observable<Property[]>;
  @Select(MapState.mapLocation) mapLocation$: Observable<any>;
  public mapLocation: MapStateModel;
  public properties: (Property & { [key: string]: any })[];
  public ngDestroyed$ = new Subject();

  public latitude = 34.0565599;
  public longitude = -118.4681932;
  private defaultZoom = 8;

  public showSecondMap = false;
  public zoom: number;
  private center: LatLng;
  private oldCenter: LatLng;
  private northEast: LatLng;
  private southWest: LatLng;
  private firstTime = true;
  private debouncedSetMapState: VoidFunction;
  public map: any;
  markers: any[] = [];


  constructor(private store: Store) {
    this.getLocation();
    this.getProperties();
    this.debouncedSetMapState = debounce(this.setMapState, 1000);
  }

  getLocation() {
    if (this.mapLocation !== undefined) {
      console.log('getLocation', this.mapLocation)
      this.latitude = this.mapLocation.centerCoordinates.latitude;
      this.longitude = this.mapLocation.centerCoordinates.longitude;
      this.zoom = this.mapLocation.zoom || this.defaultZoom;
    } else {
      this.getSelectedPropertyPosition();
    }
  }

  getSelectedPropertyPosition() {
    this.mapLocation$
      .subscribe(data => {

        this.mapLocation = data?.mapState?.mapStateModel;
        console.log('subcription:', data, this.mapLocation, this.mapLocation === undefined);
        if (this.mapLocation === undefined) {
          this.getCurrentLocation();
        } else {
          this.getLocation();
        }
      });
  }

  async getCurrentLocation() {
    const position = await Geolocation.getCurrentPosition().catch(console.log);
    this.latitude = position && position.coords.latitude;
    this.longitude = position && position.coords.longitude;
    this.zoom = this.defaultZoom;
    console.log('getCurrentLoc', position);
  }

  getProperties() {
    this.properties$
      .subscribe(data => {
        this.properties = data || [];
        this.properties.forEach(property => {
          this.markers.push({ lat: property.latitude, lng: property.longitude, id: property.id, price: property?.listings?.[0]?.price });
        });
      });
  }

  clickedMarker(id: number) {
    this.store.dispatch(new SetSelectedProperty(id.toString()));
    this.store.dispatch(new Navigate(['/tabs/listing-detail']));
  }

  ngOnInit() {
  }

  goToManagerHome() {
    this.store.dispatch(new SetManagerView(true));
    this.store.dispatch(new Navigate(['/tabs/manager-home']));
  }

  onMapReady(map: any) {
    this.map = map;
  }

  onMapBoundsChange(data: LatLngBounds) {
    if (this.firstTime) {
      this.oldCenter = data.getCenter();
      this.firstTime = false;
    }
    this.center = data.getCenter();
    this.northEast = data.getNorthEast();
    this.southWest = data.getSouthWest();
    // this.debouncedSetMapState();
    console.log('onMpasBoundsChange')
  }

  onMapZoomChange(zoom: number) {
    this.zoom = zoom;
  }

  setMapState() {
    console.log('setMapState')

    const centerCoordinates: Coords = {
      longitude: this.map.getCenter().lng(),
      latitude: this.map.getCenter().lat()
    };

    const bounds = this.map.getBounds();
    console.log(bounds);

    const mapBounds: MapBounds = {
      northEast: { latitude: bounds?.getNorthEast().lat(), longitude: bounds?.getNorthEast().lng() },
      southWest: { latitude: bounds?.getSouthWest().lat(), longitude: bounds?.getSouthWest().lng() }
    };

    const zoom: number = this.zoom;

    const mapState: MapStateModel = {
      centerCoordinates,
      mapBounds,
      zoom
    };

    this.store.dispatch(new SetMapLocation(mapState));
    if (centerCoordinates.latitude && mapBounds.northEast.latitude) {
      this.store.dispatch(new GetProperties(mapState));
    }

  }

  public ngOnDestroy() {
    this.ngDestroyed$.next();
    this.ngDestroyed$.unsubscribe();
  }
}
