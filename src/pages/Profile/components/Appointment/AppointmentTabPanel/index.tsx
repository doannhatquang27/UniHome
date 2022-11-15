import { Box } from "@material-ui/core";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export default function AppointmentTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ width: "100%", height: "100%" }}
    >
      {value === index && (
        <Box
          paddingBottom={4}
          style={{
            height: "100%",
            backgroundColor: "white",
          }}
        >
          {children}
        </Box>
      )}
    </div>
  );
}
