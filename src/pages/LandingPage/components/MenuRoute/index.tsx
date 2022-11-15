import {
  Button,
  ClickAwayListener,
  Grow,
  makeStyles,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  createStyles,
} from "@material-ui/core";
import React, { useContext, useRef, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../../../contexts/AuthContext";
import "./index.scss"

const useStyles = makeStyles(() =>
  createStyles({
    buttonRoot: {
      padding: "0 8px",
      width: "max-content",
    },
  })
);

const MenuRoute = () => {
  const classes = useStyles();
  let history = useHistory();
  const { currentUser, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: React.MouseEvent<EventTarget>) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <React.Fragment>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        classes={{ root: classes.buttonRoot }}
      >
        Xem thêm <i className="las la-angle-down"></i>
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <MenuItem onClick={() => history.push("/home")}>
                    Thuê Phòng
                  </MenuItem>
                  <MenuItem>
                    <a href="https://unihomelandingpage.gatsbyjs.io/homepage/app/" className="menu-route_link">
                      Về Unihome
                    </a>
                  </MenuItem>
                  {currentUser && (
                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                  )}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default MenuRoute;
