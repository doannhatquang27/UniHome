/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@material-ui/core";
import firebase from "firebase/app";
import "firebase/storage"; // for storage
import { Form, Formik } from "formik";
import { useSnackbar } from "notistack";
import React, { useContext, useEffect, useState } from "react";
import * as Yup from "yup";
import { COLORS } from "../../../../../constants/color";
import { AuthContext } from "../../../../../contexts/AuthContext";
import { CreateFacilityDto } from "../../../../../dtos/facilityAndServiceDtos/CreateFacilityDto";
import { NewHouseAndSlotAndUniversitiesDTO } from "../../../../../dtos/rentDtos/NewHouseAndSlotDTO";
import { NewRentAndServiceFacilityDto } from "../../../../../dtos/rentDtos/NewRentAndServiceFacilityDto";
import IBuilding from "../../../../../interfaces/UniHouseApiInterfaces/IBuilding";
import IFacility from "../../../../../interfaces/UniHouseApiInterfaces/IFacility";
import IHouse from "../../../../../interfaces/UniHouseApiInterfaces/IHouse";
import IOwner from "../../../../../interfaces/UniHouseApiInterfaces/IOwner";
import IService from "../../../../../interfaces/UniHouseApiInterfaces/IService";
import IUniversity from "../../../../../interfaces/UniHouseApiInterfaces/IUniversity";
import {
  addHouseAndItsSlotAndUniversitiesAPI,
  addNewOwner,
} from "../../../../../services/house-services";
import { loadAllDistrictOfHCMCAPI } from "../../../../../services/location-services";
import {
  addRentEntity,
  loadAllRentTypesAPI,
} from "../../../../../services/rent-services";
import {
  createFacilityByRenterAPI,
  loadAllFacilitiesAPI,
  loadAllServicesAPI,
} from "../../../../../services/service-facility-services";
import { getAllUniversitiesAPI } from "../../../../../services/university-services";
import BookingSlotComponent from "./BookingSlot";
import Building from "./Building";
import SubmitButton from "./Button";
import CurrentPeople from "./CurrentPeople";
import District from "./District";
import Ward from "./District/Ward";
import FacilitySelect from "./FacilitySelect";
import ImageUpload from "./FileUpload";
import ImageList from "./FileUpload/ImageList";
import { getRentServiceList } from "./InternalServices/service";
import LeafletMap from "./LeafletMap";
import NewServiceSelect, { ServiceSelectInfo } from "./NewServiceSelect";
import Select from "./Select";
import Textfield from "./TextField";
import Type from "./Type";
import UniversitySelect from "./UniversitySelect";

interface ISlot {
  start: number;
  end: number;
}

export interface OptionProps {
  value: string;
  label: string;
}

type SharingFormType = {
  name: string;
  address: string;
  price: string;
  gender: string;
  area: string;
  district: string;
  ward: string;
  buildingId: string;
  type: string;
  images: string[];
  building: IBuilding;
  imageList: File[];
  description: string;
  coordinaryX: any;
  coordinaryY: any;
  ownerName: string;
  ownerPhone: string;
  maxPeople: string;
  currentPeople: string;
};

const FORM_VALIDATION = Yup.object().shape({
  name: Yup.string()
    .required("Vui lòng không bỏ trống")
    .min(3, "Tên nhà phải nhiều hơn 2 ký tự"),
  address: Yup.string().required("Vui lòng không bỏ trống"),
  price: Yup.number()
    .required("Vui lòng không bỏ trống")
    .min(100000, "Giá thuê phải từ 100.000vnđ trở lên")
    .max(30 * 1000 * 1000, "Giá thuê không được quá 30 triệu vnđ"),
  area: Yup.number()
    .required("Vui lòng không bỏ trống")
    .min(10, "Diện tích phải lớn hơn 10"),
  gender: Yup.string().required("Vui lòng chọn"),
  images: Yup.array().min(1, "Vui lòng chọn một tấm hình"),
  district: Yup.string().required("Vui lòng chọn một quận/huyện"),
  ward: Yup.string().required("Vui lòng chọn một phường/xã"),
  type: Yup.string().required("Vui lòng chọn loại hình cho thuê"),
  ownerName: Yup.string().required("Vui lòng nhập tên chủ trọ"),
  ownerPhone: Yup.string()
    .required("Vui lòng nhập số điện thoại của chủ trọ")
    .matches(
      /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Số điện thoại không hợp lệ"
    )
    .min(10, "Số điện thoại phải có 10 chữ số")
    .max(10, "Số điện thoại không được quá 10 chữ số"),
  maxPeople: Yup.number().required("Vui lòng không bỏ trống"),
  currentPeople: Yup.number().required("Vui lòng không bỏ trống"),
  description: Yup.string()
    .required("Vui lòng không bỏ trống")
    .min(20, "Tối thiểu 20 ký tự"),
});

const INITIAL_FORM_STATE: SharingFormType = {
  name: "",
  address: "",
  price: "",
  gender: "",
  area: "",
  district: "",
  ward: "",
  buildingId: "",
  type: "",
  images: [],
  building: {} as IBuilding,
  imageList: [],
  description: "",
  coordinaryX: undefined,
  coordinaryY: undefined,
  ownerName: "",
  ownerPhone: "",
  maxPeople: "",
  currentPeople: "",
};

const GENDER = { "1": "Nam", "2": "Nữ", "3": "Nam hoặc Nữ" };

const SharingForm = ({
  open,
  handleClose,
  scroll,
}: {
  open: boolean;
  handleClose: any;
  scroll: any;
}) => {
  const [transferred, setTransferred] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { currentUser, accessToken } = useContext(AuthContext);
  const { enqueueSnackbar } = useSnackbar();
  const [facilityList, setFacilityList] = useState<IFacility[]>([]);
  const [serviceList, setServiceList] = useState<IService[]>([]);
  const [universityList, setUniversityList] = useState<IUniversity[]>([]);
  const [selectedFacilityList, setSelectedFacilityList] = useState<IFacility[]>(
    []
  );
  const [selectedServiceList, setSelectedServiceList] = useState<IService[]>(
    []
  );
  const [selectedUniversityList, setSelectedUniversityList] = useState<
    IUniversity[]
  >([]);
  const [districtList, setDistrictList] = useState<OptionProps[]>([]);
  const [selectedSlot, setSelectSlot] = useState<ISlot[]>([]);
  const [typeList, setTypeList] = useState<OptionProps[]>([]);

  // danh sách tiện ích chưa có trong database
  // let newFacilityList: string[] = [];
  const [newFacilityList, setNewFacilityList] = useState<string[]>([]);
  const [newServiceList, setNewServiceList] = useState<ServiceSelectInfo[]>([]);

  const getHouseType = (rentTypeId: any) => {
    switch (rentTypeId) {
      case "4AA38971-56ED-43F2-9B3C-05FB221CA4CF": //Căn hộ
        return "32449128-4251-4E31-86A7-2A7BBFC4E318";
      case "8BD8705C-DDB9-4F7A-8BFB-4AA252B31E39": //Giường KTX
        return "B812B53F-B119-4EA9-A57B-504148C04B46";
      case "673BDD9E-0E2F-4EF2-9595-81F56500E9BE": //Nhà
        return "8FB3B3BE-2E11-47CA-9FA1-1B24F15EF903";
      default: //Phòng trọ
        return "A2D9E01B-5B56-40A0-AE61-58E8798D0E0E";
    }
  };

  useEffect(() => {
    const fetchFacilityList = async () => {
      const result = await loadAllFacilitiesAPI();
      if (result) {
        setFacilityList(result);
      }
    };
    const fetchServiceList = async () => {
      const result = await loadAllServicesAPI();
      if (result) {
        setServiceList(result);
      }
    };
    const fetchUniversityList = async () => {
      const result = await getAllUniversitiesAPI();
      if (result) {
        setUniversityList(result);
      }
    };
    const fetchDistrictList = async () => {
      const result = await loadAllDistrictOfHCMCAPI();
      if (result) {
        const list = result
          .sort((a, b) =>
            parseInt(a.name.split(" ")[1]) > parseInt(b.name.split(" ")[1])
              ? 1
              : -1
          )
          .map((district) => {
            return {
              value: district.districtId,
              label: district.name,
            };
          });
        setDistrictList(list);
      }
    };
    const fetchTypeList = async () => {
      const result = await loadAllRentTypesAPI();
      if (result) {
        const list = result.map((type) => {
          return {
            value: type.rentTypeId,
            label: type.name,
          };
        });
        setTypeList(list);
      }
    };
    fetchUniversityList();
    fetchFacilityList();
    fetchServiceList();
    fetchDistrictList();
    fetchTypeList();
  }, []);

  const getLabel = (oldLabel: string) => {
    if (oldLabel.startsWith("Add ")) {
      const splitLabel = oldLabel.split('"');
      return splitLabel[1];
    } else return oldLabel;
  };

  const handleFacilityChange = (facilityNames: string[]) => {
    if (facilityNames && facilityNames.length > 0) {
      let tempList: IFacility[] = [];
      let tempNewFacilityList: string[] = [];
      for (let index = 0; index < facilityNames.length; index++) {
        const item = facilityList.find(
          (item) => item.name === facilityNames[index]
        );
        if (item) {
          tempList.push(item);
        } else {
          tempNewFacilityList.push(getLabel(facilityNames[index]));
        }
      }
      setNewFacilityList(tempNewFacilityList);
      setSelectedFacilityList(tempList);
    } else {
      if (selectedFacilityList.length !== 0) {
        setSelectedFacilityList([]);
      }
    }
  };

  const handleServiceChange = (serviceNames: string[]) => {
    if (serviceNames && serviceNames.length > 0) {
      let tempList: IService[] = [];
      for (let index = 0; index < serviceNames.length; index++) {
        const item = serviceList.find(
          (item) => item.name === serviceNames[index]
        );
        item && tempList.push(item);
      }
      setSelectedServiceList(tempList);
    } else {
      if (selectedServiceList.length !== 0) {
        setSelectedServiceList([]);
      }
    }
  };

  const handleUniversityChange = (universityName: string[]) => {
    if (universityName && universityName.length > 0) {
      let tempList: IUniversity[] = [];
      for (let index = 0; index < universityName.length; index++) {
        const item = universityList.find(
          (item) => item.name === universityName[index]
        );
        item && tempList.push(item);
      }
      setSelectedUniversityList(tempList);
    } else {
      if (selectedServiceList.length !== 0) {
        setSelectedUniversityList([]);
      }
    }
  };

  const handleChangeSlot = (list: ISlot[]) => {
    setSelectSlot(list);
  };

  const uploadImage = async (image: any) => {
    let uploadedUrl = "";
    const uploadTask = firebase
      .storage()
      .ref(`images/rent/${image.name}`)
      .put(image);

    uploadTask.on(
      "state_changed",
      (snapshot: any) => {
        setTransferred(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (error: any) => console.error(error)
    );

    await uploadTask.then(async () => {
      const mDownloadUrl = await firebase
        .storage()
        .ref("images/rent/")
        .child(image.name)
        .getDownloadURL();
      uploadedUrl = mDownloadUrl;
    });

    try {
      await uploadTask;
    } catch (error) {
      console.error(error);
    }

    return uploadedUrl;
  };

  const onUploadImage = async (image: any) => {
    const uploadedUrl = await uploadImage(image);
    setTransferred(0);
    return uploadedUrl;
  };

  const createNewFacility = async (name: string) => {
    if (currentUser && accessToken) {
      const data: CreateFacilityDto = {
        name,
        status: 1,
        icon: "61445",
        createdBy: currentUser.userId,
        isDefault: false,
      };
      const result = await createFacilityByRenterAPI(data, accessToken);
      return result;
    }
  };

  const handleChangeNewServiceList = (newServiceList: ServiceSelectInfo[]) => {
    setNewServiceList(newServiceList);
  };

  const handleSubmit = async (values: any) => {
    let newFacitilyObjectList: IFacility[] = [];
    for (let index = 0; index < newFacilityList.length; index++) {
      const result = await createNewFacility(newFacilityList[index]);
      if (result) {
        newFacitilyObjectList.push(result);
      }
    }

    let imageSrcs: string[] = [];
    if (values.imageList.length !== 0) {
      setUploading(true);
      for (let index = 0; index < values.imageList.length; index++) {
        const image = values.imageList[index];
        const imageUrl = await onUploadImage(image);
        imageSrcs.push(imageUrl);
      }
      setUploading(false);
      const newOwner = {
        ownerName: values.ownerName,
        ownerPhone: values.ownerPhone,
        image:
          "https://firebasestorage.googleapis.com/v0/b/behome-5fc33.appspot.com/o/user.png?alt=media&token=b8bb6772-1d93-492a-8a5f-8e3a26699dae",
      };
      let owner: IOwner | undefined;
      if (accessToken) {
        owner = await addNewOwner(newOwner, accessToken);
      } else {
        console.log("Chưa có access token");
      }

      if (owner) {
        const houseRequest: NewHouseAndSlotAndUniversitiesDTO = {
          house: {
            name: values.name,
            wardId: values.ward,
            address: values.address,
            image: imageSrcs.length ? imageSrcs.join(";") : null,
            houseTypeId: getHouseType(values.type),
            buildingId: values.buildingId ? values.buildingId : null,
            ownerId: owner!.ownerId,
            coordinaryX: values.coordinaryX ? values.coordinaryX : 0,
            coordinaryY: values.coordinaryY ? values.coordinaryY : 0,
            createdBy: currentUser ? currentUser.userId : "",
            certificateOfOwnership: "",
          },
          slots: selectedSlot.map((slot) => {
            return {
              startTime: slot.start,
              endTime: slot.end,
              status: 1,
            };
          }),
          universities: selectedUniversityList.map((university) => {
            return university.universityId;
          }),
        };

        let house: IHouse | undefined;
        if (accessToken) {
          house = await addHouseAndItsSlotAndUniversitiesAPI(
            houseRequest,
            accessToken
          );
        } else {
          console.log("Chưa có access token");
        }

        let newFacitilyObjectList: IFacility[] = [];
        for (let index = 0; index < newFacilityList.length; index++) {
          const result = await createNewFacility(newFacilityList[index]);
          if (result) {
            newFacitilyObjectList.push(result);
          }
        }

        if (house) {
          const rentRequest: NewRentAndServiceFacilityDto = {
            rentEntity: {
              name: values.name,
              description: values.description,
              rentTypeId: values.type,
              houseId: house!.houseId,
              price: values.price,
              area: values.area,
              gender: Number.parseInt(values.gender),
              image: imageSrcs!.length > 0 ? imageSrcs!.join(";") : "",
              isSharing: true,
              maxPeople: values.maxPeople,
              currentPeople: values.currentPeople,
              minPeople: 1,
              depositPrice: parseInt(values.price) * 0.1,
            },
            facilities: selectedFacilityList.map((item) => item.facilityId),
            services: await getRentServiceList(
              newServiceList,
              currentUser,
              accessToken
            ),
          };

          let result: boolean | undefined;
          if (accessToken) {
            result = await addRentEntity(rentRequest, accessToken);
          } else {
            console.log("Chưa có access token");
          }

          if (result) {
            enqueueSnackbar("Tạo phòng ở ghép thành công", {
              variant: "success",
              transitionDuration: { enter: 400, exit: 200 },
            });
            handleClose();
          } else {
            enqueueSnackbar("Tạo phòng thất bại", {
              variant: "error",
              transitionDuration: { enter: 400, exit: 200 },
            });
          }
        } else {
          enqueueSnackbar("Tạo phòng thất bại", {
            variant: "error",
            transitionDuration: { enter: 400, exit: 200 },
          });
        }
      } else {
        console.error("Không tạo được owner");
        enqueueSnackbar("Tạo phòng thất bại", {
          variant: "error",
          transitionDuration: { enter: 400, exit: 200 },
        });
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <Typography
          variant="overline"
          style={{
            color: COLORS.appMainColor,
            fontSize: "24px",
            fontWeight: 500,
          }}
        >
          Bài đăng mới về phòng ở ghép
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Formik
          initialValues={{ ...INITIAL_FORM_STATE }}
          validationSchema={FORM_VALIDATION}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values }) => (
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" component="span">
                    Thông tin phòng ở ghép
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={8}>
                  <Textfield name="name" label="Tên" />
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Select
                    name="gender"
                    label="Giới tính"
                    options={GENDER}
                    fullWidth={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Type
                    name="type"
                    label="Loại hình cho thuê"
                    options={typeList}
                  />
                </Grid>
                <Building name="buildingId" label="Tòa nhà" />
                <Grid item xs={12}>
                  <Textfield
                    name="price"
                    type="number"
                    label="Giá thuê ( đồng )"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Textfield
                    name="area"
                    type="number"
                    label="Diện tích ( mét vuông )"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <CurrentPeople
                    name="currentPeople"
                    type="number"
                    label="Số người ở hiện tại"
                  />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <Textfield
                    name="maxPeople"
                    type="number"
                    label="Số người ở tối đa"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FacilitySelect handleChange={handleFacilityChange} />
                </Grid>
                <Grid item xs={12}>
                  <NewServiceSelect
                    handleChangeNewServiceList={handleChangeNewServiceList}
                  />
                </Grid>
                <Grid item xs={12}>
                  <UniversitySelect handleChange={handleUniversityChange} />
                </Grid>
                <Grid item xs={12}>
                  <Textfield
                    name="description"
                    label="Mô tả"
                    multiline={true}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" component="span">
                    Địa chỉ
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Textfield name="address" label="Số nhà, đường" />
                </Grid>
                <Grid item xs={6}>
                  <District
                    name="district"
                    label="Quận/Huyện"
                    options={districtList}
                  />
                </Grid>{" "}
                <Grid item xs={6}>
                  <Ward name="ward" label="Phường/Xã" />
                </Grid>
                <Grid item xs={12}>
                  <LeafletMap />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" component="span">
                    Khung giờ
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <BookingSlotComponent handleChangeSlot={handleChangeSlot} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" component="span">
                    Thông tin chủ trọ
                  </Typography>
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Textfield name="ownerName" label="Tên chủ trọ" />
                </Grid>
                <Grid item xs={12} lg={12}>
                  <Textfield name="ownerPhone" label="Số điện thoại chủ trọ" />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" component="span">
                    Hình ảnh
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <ImageList />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    style={{
                      backgroundColor: COLORS.appMainColor,
                      color: "white",
                    }}
                  >
                    Thêm hình ảnh
                    <ImageUpload name="images" />
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <SubmitButton
                    style={{
                      float: "right",
                      backgroundColor: COLORS.appMainColor,
                      color: "white",
                    }}
                  >
                    Hoàn tất
                  </SubmitButton>
                  <Button
                    variant="outlined"
                    style={{
                      float: "right",
                      color: COLORS.appMainColor,
                      marginRight: "1%",
                    }}
                    onClick={handleClose}
                  >
                    Hủy bỏ
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default SharingForm;
