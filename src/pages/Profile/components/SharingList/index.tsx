import { Box, Button, DialogProps, Grid, Typography } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { COLORS } from "../../../../constants/color";
import { AuthContext } from "../../../../contexts/AuthContext";
import IHouse from "../../../../interfaces/UniHouseApiInterfaces/IHouse";
import { loadAllSharingEntitiesByOwnerId } from "../../../../services/rent-services";
import SharingCard from "./SharingCard";
import SharingForm from "./SharingForm";

export default function SharingList() {
  const [availableSharingHouses, setAvaialbleSharingHouses] = useState<
    IHouse[]
  >([]);
  const { currentUser } = useContext(AuthContext);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setLoading] = useState(true);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
  const [key, setKey] = useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = (scrollType: DialogProps["scroll"]) => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchSharingEntities = React.useCallback(async (ownerId: string) => {
    setLoading(true);
    const result = await loadAllSharingEntitiesByOwnerId(ownerId);
    if (result) {
      setAvaialbleSharingHouses(result.houses);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      fetchSharingEntities(currentUser.userId);
    }
  }, [currentUser, fetchSharingEntities]);

  const reloadPage = async () => {
    if (currentUser) {
      await fetchSharingEntities(currentUser.userId);
      setKey(key + 1);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography
          variant="h5"
          display="block"
          gutterBottom
          style={{ color: COLORS.appMainColor }}
        >
          Danh sách phòng ở ghép
        </Typography>
        <hr />
      </Grid>
      <Grid container spacing={2} style={{ padding: 10 }}>
        <Grid item xs={12}>
          <Button
            variant="contained"
            style={{
              float: "right",
              backgroundColor: COLORS.appMainColor,
              color: "white",
            }}
            onClick={() => handleClickOpen("paper")}
          >
            Tạo mới
          </Button>
          <SharingForm
            open={open}
            handleClose={handleClose}
            scroll={scroll}
          ></SharingForm>
        </Grid>
        <Grid item xs={12} lg={12}>
          <Box padding={2}>
            <Grid container spacing={2} key={key}>
              {availableSharingHouses.map((house) => (
                <React.Fragment>
                  <Grid item xs={12} lg={6} key={house.houseId}>
                    <SharingCard
                      house={availableSharingHouses[0]}
                      reloadPage={reloadPage}
                    />
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
