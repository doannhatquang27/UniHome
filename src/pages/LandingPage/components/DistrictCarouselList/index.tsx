import { createStyles, makeStyles } from "@material-ui/core";
import Carousel from "react-multi-carousel";
import districtBinhChanh from "../../../../assets/images/district/binh-chanh.jpg";
import districtBinhTan from "../../../../assets/images/district/binh-tan.jpg";
import districtBinhThanh from "../../../../assets/images/district/binhthanh.jpg";
import districtOne from "../../../../assets/images/district/district1.jpg";
import districtTen from "../../../../assets/images/district/district10.jpg";
import districtEleven from "../../../../assets/images/district/district11.jpg";
import districtTwelve from "../../../../assets/images/district/district12.jpg";
import districtTwo from "../../../../assets/images/district/district2.jpg";
import districtThree from "../../../../assets/images/district/district3.jpg";
import districtFour from "../../../../assets/images/district/district4.jpg";
import districtFive from "../../../../assets/images/district/district5.jpg";
import districtSix from "../../../../assets/images/district/district6.jpg";
import districtSeven from "../../../../assets/images/district/district7.jpg";
import districtEight from "../../../../assets/images/district/district8.png";
import districtNine from "../../../../assets/images/district/district9.png";
import districtPhuNhuan from "../../../../assets/images/district/phu-nhuan.jpg";
import districtTanBinh from "../../../../assets/images/district/tan-binh.jpg";
import districtTanPhu from "../../../../assets/images/district/tan-phu.jpg";
import districtGoVap from "../../../../assets/images/district/go-vap.jpg";
import districtThuDuc from "../../../../assets/images/district/thu-duc.jpg";
import districtNhaBe from "../../../../assets/images/district/nha-be.jpg";
import districtCanGio from "../../../../assets/images/district/can-gio.jpg";
import districtCuChi from "../../../../assets/images/district/cu-chi.jpg";
import districtHocMon from "../../../../assets/images/district/hoc-mon.jpg";
import DistrictCard from "./DistrictCard";
import "./index.scss";

export interface DistrictItem {
  name: string;
  districtId: string;
  districtImage: string;
}

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const districtMapping: DistrictItem[] = [
  {
    name: "Qu???n 1",
    districtId: "3621b88f-a1cc-4325-a29c-76998a55ce8c",
    districtImage: districtOne,
  },
  {
    name: "Qu???n 2",
    districtId: "af9ef7b0-b213-4b8a-bbcb-9c945df2ac9c",
    districtImage: districtTwo,
  },
  {
    name: "Qu???n 3",
    districtId: "0d6fb64a-9779-4590-9695-38e3b2c54ef9",
    districtImage: districtThree,
  },
  {
    name: "Qu???n 4",
    districtId: "2ccfbc82-beef-4c73-a50f-69c00d959c52",
    districtImage: districtFour,
  },
  {
    name: "Qu???n 5",
    districtId: "51c349f6-401d-4aac-81fe-5bdae22187e4",
    districtImage: districtFive,
  },
  {
    name: "Qu???n 6",
    districtId: "9fd27f17-0732-4f86-a4bf-c6a15a72ddcc",
    districtImage: districtSix,
  },
  {
    name: "Qu???n 7",
    districtId: "8b59f0d6-12c7-43a3-98df-91c350a79087",
    districtImage: districtSeven,
  },
  {
    name: "Qu???n 8",
    districtId: "081b6014-6263-43b6-83af-7ba628255d8a",
    districtImage: districtEight,
  },
  {
    name: "Qu???n 9",
    districtId: "974e0853-79d9-49db-b8dc-2557626ae0bc",
    districtImage: districtNine,
  },
  {
    name: "Qu???n 10",
    districtId: "1a740871-990b-47aa-86f5-31e741507c12",
    districtImage: districtTen,
  },
  {
    name: "Qu???n 11",
    districtId: "f1816e4d-98ba-456f-8215-8885ce85e174",
    districtImage: districtEleven,
  },
  {
    name: "Qu???n 12",
    districtId: "7b8a5980-d220-474c-aabd-0a2086c6af3e",
    districtImage: districtTwelve,
  },
  {
    name: "Qu???n B??nh Th???nh",
    districtId: "753f9ebc-1c46-49ce-8f26-0013a74e42b1",
    districtImage: districtBinhThanh,
  },
  {
    name: "Qu???n B??nh T??n",
    districtId: "5fc982ed-18da-4fa8-b024-f1565c608c7d",
    districtImage: districtBinhTan,
  },
  {
    name: "Qu???n T??n B??nh",
    districtId: "9a460eb6-d86a-41b1-a4ac-ef8791fe4af2",
    districtImage: districtTanBinh,
  },
  {
    name: "Qu???n T??n Ph??",
    districtId: "f00eb4e6-5d4c-4a92-a589-99541b5a7ddf",
    districtImage: districtTanPhu,
  },
  {
    name: "Qu???n Ph?? Nhu???n",
    districtId: "8d4a55f5-d90f-412e-b3f6-b32da56631cf",
    districtImage: districtPhuNhuan,
  },
  {
    name: "Qu???n G?? V???p",
    districtId: "e193eba6-4fcf-461c-b464-1804898310f2",
    districtImage: districtGoVap,
  },
  {
    name: "Qu???n Th??? ?????c",
    districtId: "59df7fea-a053-472b-b5aa-e06ba3ac8c3d",
    districtImage: districtThuDuc,
  },
  {
    name: "Huy???n B??nh Ch??nh",
    districtId: "1b376175-b6b2-40a1-a05f-410cbd17ef31",
    districtImage: districtBinhChanh
  },
  {
    name: "Huy???n H??c M??n",
    districtId: "a19781fe-db3f-474e-8a5f-0db0beb18470",
    districtImage: districtHocMon
  },
  {
    name: "Huy???n Nh?? B??",
    districtId: "ac0e1309-3a13-490b-8d11-ce6789944dd1",
    districtImage: districtNhaBe
  },
  {
    name: "Huy???n C??? Chi",
    districtId: "e87f1da7-923a-4a7e-b865-037715f1b264",
    districtImage: districtCuChi
  },
  {
    name: "Huy???n C???n Gi???",
    districtId: "4aff2587-eb92-4dbd-91c7-44cc6a3cae10",
    districtImage: districtCanGio
  },
];

const DistrictCarouselList = () => {
  const classes = useStyles();

  return (
    <div className="district-carousel-list">
      <span className="district-carousel-list_title">T??m ph??ng ??? m???i n??i</span>
      <br />
      <span className="district-carousel-list_subtitle">
        C??ng Unihome t??m ch??? ??? cho b???n
      </span>

      <div className="grid">
        <Carousel
          responsive={responsive}
          renderButtonGroupOutside={true}
          containerClass={classes.carousel}
          draggable={false}
          slidesToSlide={4}
        >
          {districtMapping.map((district, index) => (
            <div
              key={index}
              // className={classes.item}
              className="item"
              style={{ padding: "0 10px" }}
            >
              <DistrictCard
                districtItem={district}
                districtMapping={districtMapping}
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default DistrictCarouselList;

const useStyles = makeStyles(() =>
  createStyles({
    carousel: {
      "& > .react-multiple-carousel__arrow--left": {
        left: 0,
      },
      "& > .react-multiple-carousel__arrow--right": {
        right: 0,
      },
    },
  })
);
