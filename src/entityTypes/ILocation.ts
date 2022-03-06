export interface ILocation {
  id?: string;
  name: string;
  address: string;
  coordinates: {
    lat: string;
    lng: string;
  };
  category?: {
    id: string;
    name: string;
  };
}
