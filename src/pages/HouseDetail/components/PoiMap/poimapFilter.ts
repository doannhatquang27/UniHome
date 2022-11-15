import IPoiList, {
  IPoiListFeature,
} from "../../../../interfaces/UniHouseApiInterfaces/IPoiList";

export enum PoiType {
  "Food",
  "Fun",
  "Shopping",
  "Edu",
  "Other",
}

interface IPoiTypeMapping {
  typeEnum: number;
  typeName: string;
  value: string[];
}

const poiTypeMapping: IPoiTypeMapping[] = [
  {
    typeEnum: PoiType.Food,
    typeName: "Food",
    value: ["food", "drink", "coffee", "cafe", "restaurant"],
  },
  {
    typeEnum: PoiType.Fun,
    typeName: "Fun",
    value: [
      "playground",
      "nightclub",
      "cinema",
      "centre",
      "zoo",
      "fountain",
      "theatre",
      "convenience",
      "pool",
      "attraction",
      "artwork",
      "museum",
      "travel",
      "park",
      "monument",
      "memorial",
      "mall",
      "camp",
      "viewpoint",
    ],
  },
  {
    typeEnum: PoiType.Shopping,
    typeName: "Shopping",
    value: ["shop", "store", "mall", "market"],
  },
  {
    typeEnum: PoiType.Edu,
    typeName: "Edu",
    value: ["university", "school", "college"],
  },
];

export const getGeneralPoiType = (poiType: string) => {
  let result: PoiType | undefined;
  poiTypeMapping.forEach((item) => {
    if (item.value.find((name) => name === poiType)) {
      result = item.typeEnum;
    }
  });
  return result !== undefined ? result : PoiType.Other;
};

export const filterPoiByType = (poiList: IPoiList, poiTypeList: PoiType[]) => {
  const filteredList: IPoiListFeature[] = [];
  for (let z = 0; z < poiTypeList.length; z++) {
    const poiType = poiTypeList[z];
    if (poiType !== PoiType.Other) {
      const valueList = poiTypeMapping.find(
        (item) => item.typeEnum === poiType
      );
      if (valueList && poiList && poiList.features) {
        const labelList = valueList.value;

        for (let i = 0; i < poiList.features.length; i++) {
          for (let y = 0; y < labelList.length; y++) {
            const poiInfo = poiList.features[i];
            if (
              poiInfo.properties &&
              poiInfo.properties.f1 &&
              poiInfo.properties.f1.includes(labelList[y])
            ) {
              filteredList.push(poiInfo);
            }
          }
        }
      }
    }
  }
  return filteredList;
};
