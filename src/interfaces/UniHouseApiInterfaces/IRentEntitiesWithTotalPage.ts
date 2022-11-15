import IRentEntity from "./IRentEntity";

export default interface IRentEntitiesWithTotalPage {
  rentEntities: IRentEntity[];
  rentEntityCount: number;
  pageCount: number;
}
