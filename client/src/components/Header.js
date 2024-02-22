import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { localStorageKey } from "../utils/constant";
import "../styles/style.css";
import { setShowCart, setIsVerifying } from "../slices/appSlice";
import { useSelector, useDispatch } from "react-redux";

function Header(props) {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const { updateUser } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(setIsVerifying(true));
    localStorage.removeItem(localStorageKey);
    updateUser(null);
    navigate(0);
    dispatch(setIsVerifying(false));
  };

  return (
    <header className="flex justify-between align-center">
      <a href="/" className="brand">
        Shopify
      </a>
      <nav>
        {isLoggedIn ? (
          <AuthHeader handleLogout={handleLogout} />
        ) : (
          <NonAuthHeader />
        )}
      </nav>
    </header>
  );
}

function NonAuthHeader() {
  return (
    <ul className="nav-menu noauth-nav-menu flex justify-between align-center">
      <li>
        <NavLink className="nav-menu-item" activeclassname="active" to="/login">
          Sign in
        </NavLink>
      </li>
      <li>
        <NavLink
          className="nav-menu-item"
          activeclassname="active"
          to="/signup"
        >
          Sign up
        </NavLink>
      </li>
    </ul>
  );
}

function AuthHeader(props) {
  const user = useSelector((state) => state.app.user);
  const [showMenu, setShowMenu] = useState(false);

  const { handleLogout } = props;
  const dispatch = useDispatch();

  const handleHamburgerMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
      <div className="hamburger-menu">
        <div className={`hamburger-icon`} onClick={handleHamburgerMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={showMenu ? `hamburger-nav-menu` : `nav-menu`}>
          <li>
            <Link
              className="hamburger-nav-menu-item"
              to="/"
              onClick={() => {
                dispatch(setShowCart(true));
              }}
            >
              🛒My Cart
            </Link>
          </li>
          <li>
            <Link
              className="hamburger-nav-menu-item flex align-center"
              to={`/`}
            >
              {user.name}
            </Link>
          </li>
          <li>
            <button type="button" className="btn-4" onClick={handleLogout}>
              Logout
            </button>
          </li>
        </ul>
      </div>
      <ul className="nav-menu flex justify-between align-center">
        <li>
          <Link
            className="nav-menu-item"
            to="/"
            onClick={() => {
              dispatch(setShowCart(true));
            }}
          >
            🛒My Cart
          </Link>
        </li>
        <li>
          <Link className="nav-menu-item flex align-center" to={`/`}>
            {user.name}
          </Link>
        </li>
        <li>
          <button type="button" className="btn-4" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </>
  );
}

export default Header;
