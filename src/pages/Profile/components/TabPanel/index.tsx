import { Box } from "@material-ui/core";
import React from "react";
import isMobile from "react-device-detect";
interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export default function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%" }}
    >
      {value === index && (
        <Box
          marginTop={isMobile ? 0 : 4}
          paddingTop={4}
          paddingLeft={3}
          paddingRight={3}
          paddingBottom={4}
          style={{
            backgroundColor: "white",
            borderRadius: 4,
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}
