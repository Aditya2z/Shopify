import React from "react";
import { cartUrl, localStorageKey } from "../utils/constant";

function CartItem(props) {
  const { setShowCart, productObj, setCartProducts, setError, debounce } = props;

  const updateProductQuantity = (productId, newQuantity) => {
    setCartProducts((prevCartProducts) => {
      return prevCartProducts.map((cartItem) => {
        if (cartItem.product._id === productId) {
          return {
            ...cartItem,
            quantity: newQuantity,
          };
        }
        return cartItem;
      });
    });
  };

  const removeCartItem = (productId) => {
    setCartProducts((prevCartProducts) => {
      return prevCartProducts.filter(
        (cartItem) => cartItem.product._id !== productId
      );
    });
  };

  const { product, quantity } = productObj;
  const { name, _id, price, image_url } = product;
  const storageKey = localStorage.getItem(localStorageKey);

  const increaseQuantity = debounce((productId, quantity) => {
    updateProductQuantity(productId, quantity + 1);
    return fetch(`${cartUrl}/increase/${productId}`, {
      method: "PUT",
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
        errorPromise.then((errorText) => {
          setError(errorText);
        });
      });
  });

  const decreaseQuantity = debounce((productId) => {
    updateProductQuantity(productId, quantity - 1);
    return fetch(`${cartUrl}/decrease/${productId}`, {
      method: "PUT",
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
        errorPromise.then((errorText) => {
          setError(errorText);
        });
      });
  });

  const removeFromCart = debounce((productId) => {
    removeCartItem(productId);
    fetch(`${cartUrl}/${productId}`, {
      method: "DELETE",
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
          setError(errorObj);
        });
      });
  });

  if (!productObj) {
    return (
      <>
        <div className="cart-header flex justify-between align-center">
          <h2>My Cart:</h2>
          <button
            className="close-btn"
            type="button"
            onClick={() => {
              setShowCart(false);
            }}
          >
            Close❌
          </button>
        </div>
        <h2>Your Cart is Empty</h2>
      </>
    );
  }

  return (
    <div className="cart-item">
      <div className="flex justify-between align-center">
        <figure className="flex-20">
          <img src={image_url} alt={name} />
        </figure>
        <h4 className="flex-49">{name}</h4>
        <div className="quantity-control flex justify-between flex-20">
          <button
            className="quantity-btn"
            onClick={() => {
              if (quantity > 1) {
                decreaseQuantity(_id);
              } else {
                removeFromCart(_id);
              }
            }}
          >
            <i>-</i>
          </button>
          <p>{quantity}</p>
          <button
            className="quantity-btn"
            onClick={() => increaseQuantity(_id, quantity)}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item-control flex justify-between">
        <button
          className="close-btn flex flex-49"
          type="button"
          onClick={() => {
            removeFromCart(_id);
          }}
        >
          Remove Item&nbsp;
          <i>
            <img src="/static/images/bin.svg" alt="bin" />
          </i>
        </button>
        <div className="product-price flex-49">
          <h3>
            <span className="small-text">
              ${price} * {quantity} ={" "}
            </span>
            ${(price * quantity).toFixed(2)}
          </h3>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
