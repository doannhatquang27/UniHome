import { UniverityItem } from "../../pages/UniversityPage/components/UniList";
import { getAllUniversitiesAPI } from "../university-services";
import { convertNameToUrl } from "./navigation";

export const findUniFromUrlName = async (name: string) => {
  const universityList = await getAllUniversitiesAPI();
  if (universityList) {
    for (let index = 0; index < universityList.length; index++) {
      const uni = universityList[index];
      const convertedName = convertNameToUrl(uni.name);
      if (convertedName === name) {
        return uni;
      }
    }
  }
};

export const getNavigationLinkToUniversity = (university: UniverityItem) => {
  const convertedName = convertNameToUrl(university.name);
  return `/university/${convertedName}`;
};
