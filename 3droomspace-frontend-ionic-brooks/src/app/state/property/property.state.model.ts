
export interface PropertyStateModel {
    properties: Property[];
    selectedProperty: Property;
}

export interface AddrObj {
    address_line1?: string;
    city?: string;
    state?: string;
    postal_code?: string;
}

export interface Property {
    image: string;
    address: string;
    desc: string;
    price: number;
    id: string;
    latitude: number;
    longitude: number;
}

export interface PropertyAddressAsObj {
    address: AddrObj;
}

export type PropertyInput = Property & { userId: string, addrObj: AddrObj, photos?: string[] };
export type PropertyResponse = PropertyInput & PropertyAddressAsObj & { [key: string]: any };
