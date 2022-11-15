import { Box, SwipeableDrawer } from "@material-ui/core";
import * as React from "react";
import BookingForm from "../../../../components/BookingForm";
import IBookSlot from "../../../../interfaces/UniHouseApiInterfaces/IBookingSlot";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";

interface Props {
  houseId: string;
  bookingSlotList: IBookSlot[];
  open: boolean;
  setOpen: (newState: boolean) => void;
  house: IHouse;
}

const ContactDrawer: React.FC<Props> = ({
  houseId,
  bookingSlotList,
  open,
  setOpen,
  house,
}) => {
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setOpen(open);
    };

  const list = () => (
    <Box sx={{ width: "30vw" }} role="presentation">
      <BookingForm
        houseId={houseId}
        bookingSlot={bookingSlotList}
        onClose={() => setOpen(false)}
        house={house}
      />
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </div>
  );
};

export default ContactDrawer;
