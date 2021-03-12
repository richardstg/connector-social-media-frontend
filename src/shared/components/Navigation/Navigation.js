import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from "reactstrap";
import { connect } from "react-redux";

import classes from "./Navigation.module.scss";
import Backdrop from "../UI/Backdrop/Backdrop";
import Logo from "../Logo/Logo";
import * as actions from "../../../store/actions/index";

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOffset, setIsOffset] = useState(null);
  const [hideNav, setHideNav] = useState(false);

  const previousScrollPosition = useRef(0);

  const toggle = () => setIsOpen(!isOpen);

  const handleOffset = () => {
    setIsOffset(window.scrollY > 0);
  };

  const handleHideNav = () => {
    if (
      previousScrollPosition.current < window.scrollY &&
      window.scrollY > 100
    ) {
      setHideNav(true);
      setIsOpen(false);
    } else {
      setHideNav(false);
    }
    previousScrollPosition.current = window.scrollY;
  };

  useEffect(() => {
    document.addEventListener("scroll", handleOffset);
    document.addEventListener("scroll", handleHideNav);
  }, []);

  return (
    <React.Fragment>
      <Navbar
        className={`${classes.navbar} ${isOffset ? classes.down : classes.up}`}
        fixed="top"
        expand="xl"
        style={{ top: `${hideNav || props.authPage ? "-5rem" : "0"}` }}
        dark
      >
        <NavLink
          data-sal="slide-down"
          data-sal-delay="100"
          data-sal-duration="800"
          data-sal-easing="ease-in-out-back"
          className={classes.navbarBrand}
          to="/"
        >
          <Logo className={classes.logo} />
        </NavLink>
        <NavbarToggler
          className={`${classes.toggler} ${isOpen && classes.open}`}
          onClick={toggle}
        >
          <div className={classes.icon}></div>
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            {props.isLoggedIn && (
              <React.Fragment>
                <NavItem className={classes.NavItem}>
                  <NavLink
                    data-sal="slide-down"
                    data-sal-delay="100"
                    data-sal-duration="800"
                    data-sal-easing="ease-in-out-back"
                    className={classes.navLink}
                    activeClassName={classes.activeNavLink}
                    to="/profile"
                  >
                    Home
                    <svg
                      className={classes.svg}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z" />
                    </svg>
                  </NavLink>
                </NavItem>
                <NavItem className={classes.NavItem}>
                  <NavLink
                    data-sal="slide-down"
                    data-sal-delay="100"
                    data-sal-duration="800"
                    data-sal-easing="ease-in-out-back"
                    className={classes.navLink}
                    activeClassName={classes.activeNavLink}
                    to="/guest-book"
                  >
                    Guest Book
                    <svg
                      className={classes.svgGuestBook}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M448 0H64C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h96v84c0 9.8 11.2 15.5 19.1 9.7L304 416h144c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64z" />
                    </svg>
                  </NavLink>
                </NavItem>
                <NavItem className={classes.NavItem}>
                  <NavLink
                    data-sal="slide-down"
                    data-sal-delay="100"
                    data-sal-duration="800"
                    data-sal-easing="ease-in-out-back"
                    className={classes.navLink}
                    activeClassName={classes.activeNavLink}
                    to="/users"
                  >
                    Users
                    <svg
                      className={classes.svg}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 640 512"
                    >
                      <path d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" />
                    </svg>
                  </NavLink>
                </NavItem>
                <NavItem className={classes.NavItem}>
                  <NavLink
                    data-sal="slide-down"
                    data-sal-delay="100"
                    data-sal-duration="800"
                    data-sal-easing="ease-in-out-back"
                    className={classes.navLink}
                    activeClassName={classes.activeNavLink}
                    to="/feed"
                  >
                    Feed
                    <svg
                      className={classes.svg}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                    >
                      <path d="M552 64H88c-13.255 0-24 10.745-24 24v8H24c-13.255 0-24 10.745-24 24v272c0 30.928 25.072 56 56 56h472c26.51 0 48-21.49 48-48V88c0-13.255-10.745-24-24-24zM56 400a8 8 0 0 1-8-8V144h16v248a8 8 0 0 1-8 8zm236-16H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm-208-96H140c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm208 0H348c-6.627 0-12-5.373-12-12v-8c0-6.627 5.373-12 12-12h152c6.627 0 12 5.373 12 12v8c0 6.627-5.373 12-12 12zm0-96H140c-6.627 0-12-5.373-12-12v-40c0-6.627 5.373-12 12-12h360c6.627 0 12 5.373 12 12v40c0 6.627-5.373 12-12 12z" />
                    </svg>
                  </NavLink>
                </NavItem>
                <NavItem className={classes.NavItem}>
                  <div
                    data-sal="slide-down"
                    data-sal-delay="100"
                    data-sal-duration="800"
                    data-sal-easing="ease-in-out-back"
                    className={`${classes.navLink} ${classes.logout}`}
                    to="#"
                    onClick={props.onLogout}
                  >
                    Logout
                    <svg
                      className={classes.svg}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
                    </svg>
                  </div>
                </NavItem>
              </React.Fragment>
            )}
          </Nav>
        </Collapse>
      </Navbar>
      {isOpen && <Backdrop show onClick={() => setIsOpen(false)} />}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => {
      dispatch(actions.logout());
      dispatch(actions.resetUser());
      dispatch(actions.resetFeed());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
