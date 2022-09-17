import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }


  async saveToken(token: string) {
    const { Storage } = Plugins;
    await Storage.set({
      key: 'access_token',
      value: token
    });
  }

  async getToken() {
    const { Storage } = Plugins;
    const { value } = await Storage.get({ key: 'access_token' });
    return value;
  }
}
