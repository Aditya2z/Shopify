import React from "react";
import CartItem from "./CartItem";

function CartSidebar(props) {
  const {
    setShowCart,
    setError,
    cartProducts,
    setCartProducts,
  } = props;

  const calculateTotal = () => {
    return cartProducts
      .reduce(
        (total, productObj) =>
          total + productObj.product.price * productObj.quantity,
        0
      )
      .toFixed(2);
  };

  if ((!cartProducts || cartProducts.length === 0)) {
    return (
      <aside className="cart-sidebar">
        <div className="cart-header flex justify-between align-center">
          <h2>My Cart:</h2>
          <button
            className="close-btn"
            type="button"
            onClick={() => {
              setShowCart(false);
            }}
          >
            ❌
          </button>
        </div>
        <h3>Your cart is Empty!</h3>
        <p className="cart-total">Total: $0</p>
      </aside>
    );
  }

  return (
    <aside className="cart-sidebar">
      <div className="cart-header flex justify-between align-center">
        <h2>My Cart:</h2>
        <button
          className="close-btn"
          type="button"
          onClick={() => {
            setShowCart(false);
          }}
        >
          ❌
        </button>
      </div>
      {cartProducts.map((productObj, index) => (
        <CartItem
          productObj={productObj}
          setCartProducts={setCartProducts}
          setError={setError}
          key={index}
          {...props}
        />
      ))}
      <p className="cart-total">Total: ${calculateTotal()}</p>
    </aside>
  );
}

export default CartSidebar;
