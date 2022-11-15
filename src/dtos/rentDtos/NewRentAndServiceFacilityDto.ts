export interface NewRentAndServiceFacilityDto {
  rentEntity: {
    name: string;
    description: string;
    rentTypeId: string;
    houseId: string;
    price: number;
    area: number;
    gender: number;
    image: string;
    isSharing: boolean;
    maxPeople: number;
    currentPeople: number;
    minPeople: number;
    depositPrice: number;
  };
  facilities: string[];
  services: string[];
}
