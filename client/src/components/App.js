import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Header from "./Header";
import LoginPage from "./Login";
import SignupPage from "./Signup";
import HomePage from "./HomePage";
import NoMatch from "./NoMatch";
import AlreadyLoggedIn from "./AlreadyAuthenticated";
import FullPageLoader from "./loader/FullPageLoader";
import ErrorPage from "./ErrorPage";
import Footer from "./Footer";
import { userVerifyUrl, localStorageKey } from "../utils/constant";
import {
  setUser,
  setIsLoggedIn,
  setIsVerifying,
  setError,
} from "../slices/appSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const storageKey = localStorage.getItem(localStorageKey) || "";
  const isVerifying = useSelector((state) => state.app.isVerifying);
  const error = useSelector((state) => state.app.error);
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const updateUser = (data = null) => {
    dispatch(setIsLoggedIn(!isLoggedIn));
    if (data) {
      const token = data.token || storageKey;
      dispatch(setUser(data.user));
      localStorage.setItem(localStorageKey, token);
    } else {
      dispatch(setUser(null));
    }
  };

  useEffect(() => {
    if (storageKey) {
      fetch(userVerifyUrl, {
        method: "GET",
        headers: {
          Authorization: storageKey,
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          throw res.json();
        })
        .then((data) => {
          updateUser(data);
          dispatch(setIsVerifying(false));
        })
        .catch((error) => {
          if (Promise.resolve(error) === error) {
            // `error` is a Promise
            error.then((errorObj) => {
              dispatch(setError(errorObj));
              dispatch(setIsVerifying(false));
            });
          } else {
            // `error` is not a Promise
            dispatch(setError(error));
            dispatch(setIsVerifying(false));
          }
        });
    } else {
      dispatch(setIsVerifying(false));
    }
  }, []);

  if (isVerifying) {
    return <FullPageLoader />;
  }

  return (
    <>
      <Header updateUser={updateUser} />
      <main>
        <Routes>
          <Route path="/" element={error ? <ErrorPage /> : <HomePage />} />

          <Route
            path="/login"
            element={isLoggedIn ? <AlreadyLoggedIn /> : <LoginPage updateUser={updateUser} />}
          />
          <Route
            path="/signup"
            element={isLoggedIn ? <AlreadyLoggedIn /> : <SignupPage />}
          />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
