import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import { Omit } from "@material-ui/types";
import React from "react";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";

interface ListItemLinkProps {
  to: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    gutters: {
      padding: 5,
    },
    root: {
      height: "100%",
    },
  })
);

const ListItemLink: React.FC<ListItemLinkProps> = ({ children, to }) => {
  const classes = useStyles();
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem
      button
      component={renderLink}
      classes={{ gutters: classes.gutters, root: classes.root }}
    >
      {children}
    </ListItem>
  );
};

export default ListItemLink;
