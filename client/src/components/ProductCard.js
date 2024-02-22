import React from "react";
import Like from "./Like";
import { localStorageKey, cartUrl } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setShowCart, setError } from "../slices/appSlice";

function ProductCard(props) {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);

  const { product, setCartProducts, debounce } = props;

  const storageKey = localStorage.getItem(localStorageKey) || "";
  const navigate = useNavigate();

  const addCartItem = (productId) => {
    setCartProducts((prevCartProducts) => {
      const updatedCartProducts = [...prevCartProducts];
      const existingCartItemIndex = updatedCartProducts.findIndex(
        (cartItem) => cartItem.product._id === productId
      );

      if (existingCartItemIndex !== -1) {
        updatedCartProducts[existingCartItemIndex].quantity += 1;
      } else {
        updatedCartProducts.push({
          product: product,
          quantity: 1,
        });
      }
      return updatedCartProducts;
    });
  };

  // Function to add a product to the user's cart
  const addToCart = debounce((productId) => {
    if (isLoggedIn) {
      addCartItem(productId);
      dispatch(setShowCart(true));
      fetch(`${cartUrl}/${productId}`, {
        method: "POST",
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
        .catch((errorPromise) => {
          errorPromise.then((errorObj) => {
            dispatch(setError(errorObj));
          });
        });
    } else {
      navigate("/login");
    }
  });

  return (
    <>
      <div className="product-card">
        <figure>
          <img src={product.image_url} alt={product.name} />
          <p className="likes">
            <Like product={product} debounce={debounce} />
          </p>
        </figure>
        <div className="product-details">
          <div className="flex justify-between align-center product-heading">
            <h4>{product.name}</h4>
            <h3>${product.price}</h3>
          </div>
          <p>{product.description}</p>
        </div>
        <button
          type="button"
          className="btn-2"
          onClick={() => {
            addToCart(product._id);
          }}
        >
          🛒 Add to cart
        </button>
      </div>
    </>
  );
}

export default ProductCard;
