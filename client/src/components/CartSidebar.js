import React from "react";
import { setShowCart } from "../slices/appSlice";
import CartItem from "./CartItem";
import { useDispatch } from "react-redux";

function CartSidebar(props) {
  const { cartProducts, setCartProducts, debounce } = props;
  const dispatch = useDispatch();

  const calculateTotal = () => {
    return cartProducts
      .reduce(
        (total, productObj) =>
          total + productObj.product.price * productObj.quantity,
        0
      )
      .toFixed(2);
  };

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <aside className="cart-sidebar">
        <div className="cart-header flex justify-between align-center">
          <h2>My Cart:</h2>
          <button className="close-btn" type="button" onClick={() => {}}>
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
            dispatch(setShowCart(false));
          }}
        >
          ❌
        </button>
      </div>
      {cartProducts.map((productObj, index) => (
        <CartItem
          debounce={debounce}
          productObj={productObj}
          setCartProducts={setCartProducts}
          key={index}
          {...props}
        />
      ))}
      <p className="cart-total">Total: ${calculateTotal()}</p>
    </aside>
  );
}

export default CartSidebar;
