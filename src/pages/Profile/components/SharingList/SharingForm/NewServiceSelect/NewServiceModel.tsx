import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  CheckboxProps,
  createStyles,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  makeStyles,
  MenuItem,
  Modal,
  Select,
  TextField,
  Theme,
  withStyles,
} from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { FC, useEffect, useState } from "react";
import { PriceUnit, ServiceModalStatus, ServiceSelectInfo } from ".";
import "./index.scss";

interface Props {
  open: boolean;
  onClose: () => void;
  data: ServiceSelectInfo | null;
  handleSave: (status: ServiceModalStatus, data: ServiceSelectInfo) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    cardAction: {
      padding: "8px 16px",
    },
  })
);

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

const NewServiceModel: FC<Props> = ({ open, onClose, data, handleSave }) => {
  const [value, setValue] = useState<ServiceSelectInfo>(
    data
      ? data
      : {
          serviceId: "",
          serviceName: "",
          price: 0,
          unit: PriceUnit.Month,
          selected: false,
        }
  );
  const classes = useStyles();

  useEffect(() => {
    setValue(
      data
        ? data
        : ({
            serviceId: "",
            serviceName: "",
            price: 0,
            unit: PriceUnit.Month,
            selected: false,
          } as ServiceSelectInfo)
    );
  }, [data]);

  const handleChangeName = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue((prev) => ({
      ...prev,
      serviceName: event.target.value as string,
    }));
  };

  const handleChangePrice = (event: React.ChangeEvent<{ value: unknown }>) => {
    const converted = parseFloat(event.target.value as string);
    setValue((prev) => ({
      ...prev,
      price: isNaN(converted) ? 0 : converted,
    }));
  };

  const handleChangeUnit = (event: React.ChangeEvent<{ value: unknown }>) => {
    setValue((prev) => ({
      ...prev,
      unit: event.target.value as PriceUnit,
    }));
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => ({
      ...prev,
      isConsistent: event.target.checked,
    }));
  };

  const onClickHandle = () => {
    const status = data ? ServiceModalStatus.Update : ServiceModalStatus.Create;
    handleSave(status, value);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Card className="new-service-card">
        <CardHeader
          className="new-service-card_card-header"
          title="Thêm mới dịch vụ, tiện ích"
        />
        <CardContent className="new-service-card_card-content">
          <Grid container>
            <Grid item xs={12}>
              <TextField
                value={value.serviceName}
                onChange={handleChangeName}
                variant="outlined"
                label="Tên dịch vụ, tiện ích"
                fullWidth
              />
            </Grid>
            <Grid
              item
              xs={6}
              className="new-service-card_card-content_price-unit"
              style={{ paddingRight: 8 }}
            >
              <TextField
                value={value.price}
                onChange={handleChangePrice}
                variant="outlined"
                label="Nhập giá"
                required
                fullWidth
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
            </Grid>
            <Grid
              item
              xs={6}
              className="new-service-card_card-content_price-unit"
              style={{ paddingLeft: 8 }}
            >
              <FormControl variant="outlined" fullWidth>
                <InputLabel>Chọn dơn vị</InputLabel>
                <Select
                  value={value.unit}
                  onChange={handleChangeUnit}
                  label="Đơn vị"
                >
                  <MenuItem value={PriceUnit.Month}>Tháng</MenuItem>
                  <MenuItem value={PriceUnit.Person}>Người</MenuItem>
                  <MenuItem value={PriceUnit.CubicMetre}>Mét khối</MenuItem>
                  <MenuItem value={PriceUnit.KilowattHour}>Kwh</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={value.isConsistent}
                    onChange={handleCheckbox}
                  />
                }
                label="Số lượng cố định mỗi tháng"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions classes={{ root: classes.cardAction }}>
          <Button
            size="small"
            variant="outlined"
            color="primary"
            onClick={onClickHandle}
          >
            {data === null ? "Thêm mới" : "Cập nhật"}
          </Button>
          <Button
            size="small"
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Hủy bỏ
          </Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default NewServiceModel;
