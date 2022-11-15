import { Button, ButtonGroup, Chip, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BookingSlot } from "../../../../../../enums/BookingSlot";
import "./index.scss";

interface IBookingSlot {
  index: number;
  slotTime: string;
  status: boolean;
}

interface ISlot {
  start: number;
  end: number;
}

interface Props {
  handleChangeSlot: (list: ISlot[]) => void;
}

const BookingSlotComponent: React.FC<Props> = ({ handleChangeSlot }) => {
  const [isAM, setIsAM] = useState(true);
  const [isChange, setChange] = useState(1);
  const [bookingSlotList, setBookingSlotList] = useState<IBookingSlot[]>([]);
  const [selectedList, setSelectedList] = useState<ISlot[]>([]);

  useEffect(() => {
    const length = 48;
    let temp = [] as IBookingSlot[];

    for (let i = 0; i < length; i++) {
      temp.push({ index: i, slotTime: BookingSlot[i], status: false });
    }
    setBookingSlotList(temp);
  }, []);

  useEffect(() => {
    combineSlot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChange]);

  const combineSlot = () => {
    const selectedSlots = bookingSlotList.filter(
      (item) => item.status === true
    );
    const slotTimeList: (ISlot | null)[] = [];
    selectedSlots.forEach((slot) =>
      slotTimeList.push({
        start: slot.index,
        end: slot.index,
      })
    );

    for (let index = 1; index < slotTimeList.length; index++) {
      if (slotTimeList[index] !== null && slotTimeList[index - 1] !== null) {
        if (slotTimeList[index]!.start === slotTimeList[index - 1]!.end + 1) {
          slotTimeList[index] = {
            start: slotTimeList[index - 1]!.start,
            end: slotTimeList[index]!.end,
          };
          slotTimeList[index - 1] = null;
        }
      }
    }
    const removeNullItemList = slotTimeList.filter((item) => item !== null);
    const tempSelectedList: ISlot[] = [];
    removeNullItemList.forEach((item) => {
      if (item !== null) {
        tempSelectedList.push(item);
      }
    });
    setSelectedList(tempSelectedList);

    const plusOneToEndList: ISlot[] = [];
    tempSelectedList.forEach((item) => {
      plusOneToEndList.push({ start: item.start, end: item.end + 1 });
    });
    handleChangeSlot(plusOneToEndList);
  };

  const handleBookingSlotChange = (slot: number) => {
    const temp = bookingSlotList;
    temp[slot].status = !temp[slot].status;
    setBookingSlotList(temp);
    setChange(isChange + 1);
  };

  return (
    <React.Fragment key={isChange}>
      <div
        style={{
          borderRadius: 4,
          border: "1px solid",
          padding: "14.5px 14px",
          borderColor: "rgba(0, 0, 0, 0.23)",
        }}
      >
        {selectedList.length > 0
          ? selectedList.map((item, index) => (
              <div style={{ padding: 2, display: "inline-flex" }} key={index}>
                <Chip
                  label={`${BookingSlot[item!.start].split(" ")[0]} - ${
                    BookingSlot[item!.end].split(" ")[2]
                  }`}
                />
              </div>
            ))
          : null}
        {bookingSlotList.length === 0 ||
        (bookingSlotList.length > 0 &&
          bookingSlotList.filter((item) => item.status === true).length ===
            0) ? (
          <span
            style={{
              color: "rgb(118, 118, 118)",
              display: "inline-flex",
              alignItems: "center",
              height: 36,
            }}
          >
            Chọn khung giờ
          </span>
        ) : null}
      </div>

      <ButtonGroup
        aria-label="outlined primary button group"
        className="booking-slot__button-group"
      >
        <Button
          disabled={isAM}
          onClick={() => setIsAM(true)}
          className={isAM ? "booking-slot__button-group--morning" : ""}
          color="secondary"
        >
          <span className="las la-sun" />
          &nbsp;&nbsp;Sáng
        </Button>
        <Button
          disabled={!isAM}
          onClick={() => setIsAM(false)}
          className={!isAM ? "booking-slot__button-group--afternoon" : ""}
          color="primary"
        >
          <span className="las la-cloud-sun" />
          &nbsp;&nbsp;Chiều
        </Button>
      </ButtonGroup>
      <Grid container>
        {bookingSlotList
          .filter((slot, index) => (isAM ? index < 24 : index > 23))
          .map((slot) => (
            <Grid
              key={slot.index}
              item
              xs={3}
              lg={4}
              className="booking-slot__grid"
            >
              <Button
                fullWidth
                variant={slot.status ? "contained" : "outlined"}
                color="primary"
                onClick={() => handleBookingSlotChange(slot.index)}
              >
                {slot.slotTime}
              </Button>
            </Grid>
          ))}
      </Grid>
    </React.Fragment>
  );
};

export default BookingSlotComponent;
