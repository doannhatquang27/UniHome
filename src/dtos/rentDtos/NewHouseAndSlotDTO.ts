export interface NewHouseAndSlotAndUniversitiesDTO {
  house: {
    name: string;
    wardId: string;
    address: string;
    image: string | null;
    buildingId: string;
    ownerId: string;
    coordinaryX: number;
    coordinaryY: number;
    houseTypeId: string;
    createdBy: string;
    certificateOfOwnership: string;
  };
  slots: {
    // slotId: string;
    // houseId: string;
    startTime: number;
    endTime: number;
    status: number;
  }[];
  universities: string[];
}
