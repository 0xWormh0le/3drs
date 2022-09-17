import { UserModel } from './renter-info.model';

export class GetRenterInfo {
  static readonly type = '[Renter] Get Renter Info';
  constructor(public name: string) { }
}

export class UpdateRenterInfo {
  static readonly type = '[Renter] Update renter info';
  constructor(public renterInfo: UserModel) { }
}

export class UpdatePriceRange {
  static readonly type = '[Renter] Update Price Range';
  constructor(public minMax: { upper: number, lower: number }) { }
}

export class WelcomeFormSubmitted {
  static readonly type = '[Renter] Welcome form submitted';
  constructor() { }
}
