import axiosInstance from "./axios-instance";

interface ICity {
  cityId: string;
  name: string;
  district: IDistrict[];
}

interface IDistrict {
  districtId: string;
  name: string;
  ward: IWard[];
}

interface IWard {
  wardId: string;
  name: string;
}

// export const loadAllCityAPI = async () => {
//   const url = "/location/cities";
//   let result: ICity[] = [];
//   await axiosInstance
//     .get(url)
//     .then((response) => {
//       result = response.data as unknown as ICity[];
//     })
//     .catch((error) => console.error(error));
//   return result;
// };

export const loadAllDistrictOfHCMCAPI = async () => {
  const url = "/locations/districts";
  let result: IDistrict[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IDistrict[];
    })
    .catch((error) => console.error(error));
  return result;
};

export const loadWardsByIdOfADistrictOfHCMCAPI = async (districtId: string) => {
  const url = `/locations/districts/${districtId}/wards`;
  let result: IWard[] = [];
  await axiosInstance
    .get(url)
    .then((response) => {
      result = response.data as IWard[];
    })
    .catch((error) => console.error(error));
  return result;
};

// export const loadAllDistrictOfCityAPI = async (cityId: string) => {
//   const url = "/location/city/district";
//   let result: IDistrict[] = [];
//   await axiosInstance
//     .get(url, {
//       params: {
//         cityId,
//       },
//     })
//     .then((response) => {
//       result = response.data as unknown as IDistrict[];
//     })
//     .catch((error) => console.error(error));
//   return result;
// };
