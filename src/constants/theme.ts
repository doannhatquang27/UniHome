import { createTheme } from "@material-ui/core";
import { COLORS } from "./color";

export const CALENDAR_THEME = createTheme({
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: COLORS.appMainColor,
      },
    },
    MuiPickersCalendarHeader: {
      transitionContainer: {
        color: COLORS.appMainColor,
      },
      iconButton: {
        color: COLORS.appMainColor,
      },
    },
    MuiPickersDay: {
      day: {
        color: COLORS.appMainColor,
      },
      daySelected: {
        backgroundColor: COLORS.appMainColor,
      },
      dayDisabled: {
        color: "grey",
      },
      current: {
        color: COLORS.appMainColor,
      },
    },
    MuiPickersYear: {
      yearSelected: {
        color: COLORS.appMainColor,
      },
    },
    MuiPickersModal: {
      dialogAction: {
        color: COLORS.appMainColor,
      },
    },
  },
});

export const TAB_THEME = createTheme({
  overrides: {
    MuiTabs: {
      indicator: {
        display: "none",
      },
    },
    MuiTab: {
      root: {
        "&:hover": {
          color: COLORS.appMainColor,
        },
        marginBottom: "16px",
        "&$selected": {
          color: COLORS.appMainColor,
        },
      },
      textColorInherit: {
        "&$selected": {
          color: COLORS.appMainColor,
          fontSize: "15px",
        },
      },
    },
  },
});

export const APPOINTMENT_TAB_THEME = createTheme({
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: COLORS.appMainColor,
      },
    },
    MuiTab: {
      root: {
        "&:hover": {
          color: COLORS.appMainColor,
        },
        "&$selected": {
          color: COLORS.appMainColor,
        },
      },
      textColorInherit: {
        "&$selected": {
          color: COLORS.appMainColor,
        },
      },
    },
  },
});
