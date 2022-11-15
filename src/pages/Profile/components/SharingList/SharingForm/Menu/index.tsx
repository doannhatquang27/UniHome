import { Button } from "@material-ui/core";
import React from "react";
import { COLORS } from "../../../../../../constants/color";

const MenuWrapper = ( insert: any ) => {
  return (
    <div>
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        style={{
          float: "right",
          backgroundColor: COLORS.appMainColor,
          color: "white",
        }}
        onClick={insert}
      >
        <i className="la la-plus-circle" style={{ fontSize: "20px" }} />
      </Button>
    </div>
  );
};

export default MenuWrapper;
