import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import { productUrl } from "../utils/constant";
import { localStorageKey } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../slices/appSlice";

function Like(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const { product, debounce } = props;
  const navigate = useNavigate();

  const storageKey = localStorage.getItem(localStorageKey) || "";
  const { likes, liked, _id } = product;

  const [numberOfLikes, setLikes] = useState(likes);
  const [isLiked, setLiked] = useState(liked);

  useEffect(() => {}, [isLoggedIn]);

  const LikeProduct = debounce((productid) => {
    setLikes((prevLikes) => (isLiked ? prevLikes - 1 : prevLikes + 1));
    setLiked(!liked);
    let method = "PUT";
    if (isLiked) {
      method = "DELETE";
    }
    if (isLoggedIn) {
      fetch(`${productUrl}/${productid}/like`, {
        method,
        headers: {
          Authorization: storageKey,
        },
      })
        .then((res) => {
          if (res.ok) {
            setLiked(!isLiked);
            return res.json();
          }
          throw res.json();
        })
        .catch((errorPromise) => {
          errorPromise.then((errorObj) => {
            dispatch(setError(errorObj));
          });
        });
    }
  });

  return (
    <button
      type="button"
      className={`like flex ${isLiked ? "active" : ""}`}
      onClick={() => {
        if (isLoggedIn) {
          LikeProduct(_id);
        } else {
          navigate("/login");
        }
      }}
    >
      <p>❤&nbsp;</p>
      <p>{numberOfLikes}</p>
    </button>
  );
}

export default Like;
