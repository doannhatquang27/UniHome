import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import React from "react";
import { BreadCrumb } from "../../interfaces/Breadcrumb";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
      padding: 10,
      marginLeft: "10vw",
    },
    link: {
      fontWeight: 400,
      "&:hover": {
        fontWeight: 600,
        textDecoration: "none",
      },
    },
    currentLink: {
      fontWeight: 700,
      color: "#16a596",
    },
  })
);

interface Props {
  breadcrumbList: BreadCrumb[];
}

const CustomSeparator: React.FC<Props> = ({ breadcrumbList }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {breadcrumbList.map((breadcrumb, index) =>
          breadcrumb.to ? (
            <Link
              color="inherit"
              className={classes.link}
              href={breadcrumb.to}
              key={index}
            >
              {breadcrumb.label}
            </Link>
          ) : (
            <Typography className={classes.currentLink} key={index}>
              {breadcrumb.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    </div>
  );
};

export default CustomSeparator;
