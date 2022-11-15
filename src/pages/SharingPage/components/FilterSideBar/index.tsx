import Button from "@material-ui/core/Button";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import SortIcon from "@material-ui/icons/Sort";
import React from "react";

const FilterSideBar: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      <React.Fragment>
        <Button
          variant="text"
          color="default"
          startIcon={<SortIcon />}
          onClick={() => setOpen(true)}
        >
          Lọc
        </Button>
        <SwipeableDrawer
          anchor="left"
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        >
          {children}
        </SwipeableDrawer>
      </React.Fragment>
    </div>
  );
};

export default FilterSideBar;
