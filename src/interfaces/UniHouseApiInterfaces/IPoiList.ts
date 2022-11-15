export default interface IPoiList {
  type: string;
  features: IPoiListFeature[];
}

export interface IPoiListFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number[]];
  };
  properties: {
    f1: string;
    f2: string;
    f3: number;
    f4: number;
    f5: string;
  };
}
