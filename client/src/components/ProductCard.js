import React from "react";
import Like from "./Like";
import { localStorageKey, cartUrl } from "../utils/constant";
import { useNavigate } from "react-router-dom";

function ProductCard(props) {
  const {
    product,
    setShowCart,
    setError,
    setCartProducts,
    isLoggedIn,
    debounce,
  } = props;

  const storageKey = localStorage.getItem(localStorageKey) || "";
  const navigate = useNavigate();

  // Function to add a product to the user's cart
  const addToCart = debounce((productId) => {
    if (isLoggedIn) {
      setShowCart(true);
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
        .then((data) => {
          setCartProducts(data.cart.items);
        })
        .catch((errorPromise) => {
          errorPromise.then((errorObj) => {
            setError(errorObj);
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
            <Like
              product={product}
              isLoggedIn={isLoggedIn}
              setError={setError}
              debounce={debounce}
            />
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
