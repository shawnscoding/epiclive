import React from "react";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import { toggleHelpModal } from "../../redux/modal/actions";
import { connect } from "react-redux";
import { userLogOut } from "../../redux/auth/actions";
import { withRouter } from "react-router-dom";

function HeaderMenu({ admin = false, toggleHelpModal, logOut, history }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleHelpOpen = (e) => {
    handleClose(e);
    toggleHelpModal();
  };

  const handleLogOut = (e) => {
    logOut();
    handleClose(e);
    history.push("/");
  };

  return (
    <div>
      <Button
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {admin ? (
          <React.Fragment>
            <PersonOutlineIcon />
            <p>admin</p>
          </React.Fragment>
        ) : (
          <HelpOutlineIcon />
        )}
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
              transformOrigin: placement === "top",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                {admin ? (
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={(e) => handleLogOut(e)}>LogOut</MenuItem>
                  </MenuList>
                ) : (
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem onClick={handleHelpOpen}>Page Help</MenuItem>
                    <MenuItem onClick={handleClose}>About Page</MenuItem>
                  </MenuList>
                )}
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  toggleHelpModal: () => dispatch(toggleHelpModal()),
  logOut: () => dispatch(userLogOut()),
});

export default withRouter(connect(null, mapDispatchToProps)(HeaderMenu));
