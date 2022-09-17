import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { environment } from 'src/environments/environment';
import { Property, AddrObj, PropertyInput, PropertyResponse } from '../../state/property/property.state.model';
import { mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  public async getProperties(mapState: any) {
    const token = await this.tokenService.getToken();
    const header = { Authorization: `Bearer ${token}` };
    // tslint:disable-next-line: max-line-length
    console.log(mapState);
    console.log(mapState.mapState.mapBounds.southWest);
    const queryParam = `lngW=${mapState.mapState.mapBounds.southWest.longitude}&latS=${mapState.mapState.mapBounds.southWest.latitude}&lngE=${mapState.mapState.mapBounds.northEast.longitude}&latN=${mapState.mapState.mapBounds.northEast.latitude}`;
    return this.http.get(`${environment.url}/api/properties/search/location/area?${queryParam}`, { headers: header });
  }

  public async uploadPhoto(img64, propertyId) {
    const token = await this.tokenService.getToken();
    // const header = { Authorization: `Bearer ${token}`, 'Content-Type': "multipart/form-data" };
    const header = { Authorization: `Bearer ${token}`, 'Content-Type': "application/json" };
    // const formData = new FormData();
    // formData.append('file', img64);
    // formData.append('propertyId', propertyId);
    // formData.append('options', JSON.stringify({}));
    const body = {
      file: img64,
      id: propertyId,
      options: JSON.stringify({})
    };
    return this.http.post(`${environment.url}/api/properties/photos/upload/single`, body, { headers: header });
  }

  public async addProperty({ property }: { property: PropertyInput }) {
    const token = await this.tokenService.getToken();
    const header = { Authorization: `Bearer ${token}` };
    // tslint:disable-next-line: max-line-length
    console.log(property);
    const body = {
      id: property.id,
      address: property.addrObj,
      description: property.desc,
      userId: property.userId,
      property_status: 'AVAILABLE',
      bedrooms: 3,
      bathrooms: '2.50',
      parking: 'string',
      parking_type: 'string',
      parking_num_spaces: 0,
      heating: 'string',
      cooling: 'string',
      laundry: 'string',
      property_type: 'string',
      size_sq_ft: 500,
      accessible: true,
      photos: property.photos
    };

    const fetchProperty = this.http.post(`${environment.url}/api/properties/register`, body, { headers: header });
    const fetchListing = (propertyResponse: PropertyResponse) => this.http.post(
      `${environment.url}/api/listings/create`,
      {
        propertyId: propertyResponse.id,
        price: property.price,
        description: property.desc,
        listingAgentId: property.userId,
        listing_date: '2020-05-16T19:41:23.376Z',
        status: 'string',
        summary: 'string',
        viewing: 'string',
        lease_period_min: 0,
        lease_period_max: 0,
        sublet_ok: true,
        max_occupancy: 0,
        pets_allowed: true,
        pet_restrictions: 'string',
        date_available: '2020-05-16T19:41:23.376Z',
        listing_agent_name: 'string',
        wifi_available: true,
        marijuana_ok: true,
        alcohol_ok: true,
        smoking_ok: true,
        active: true,
        publish_up_date: '2020-05-16T19:41:23.376Z',
        publish_down_date: '2020-05-16T19:41:23.376Z'
      },
      { headers: header }
    );

    return fetchProperty
      .pipe(mergeMap((property: PropertyResponse) =>
        fetchListing(property)
          .pipe(map(_ => ({
            ...property,
            listings: [ _ ]
          })))
      ));
  }
}
