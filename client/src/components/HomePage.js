import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import FullPageLoader from "./loader/FullPageLoader";
import ErrorPage from "./ErrorPage";
import CartSidebar from "./CartSidebar";
import "../styles/style.css";
import { productUrl, localStorageKey, cartUrl } from "../utils/constant";
import { useSelector } from "react-redux";

function HomePage() {
  const isLoggedIn = useSelector((state) => state.app.isLoggedIn);
  const showCart = useSelector((state) => state.app.showCart);

  const [products, setProducts] = useState(null);
  const [cartProducts, setCartProducts] = useState(null);
  const [error, setError] = useState(null);
  const [isVerifying, setIsVerifying] = useState(true);

  const storageKey = localStorage.getItem(localStorageKey) || "";

  const fetchProducts = () => {
    fetch(productUrl, {
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
        setProducts(data.products);
        setIsVerifying(false);
      })
      .catch((errorPromise) => {
        errorPromise.then((errorText) => {
          setError(errorText);
        });
      });
  };

  const fetchCartProducts = () => {
    if (isLoggedIn) {
      fetch(`${cartUrl}`, {
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
          setCartProducts(data.cart.items);
          setIsVerifying(false);
        })
        .catch((errorPromise) => {
          errorPromise.then((errorText) => {
            setError(errorText);
            setIsVerifying(false);
          });
        });
    }
  };

  function debounce(func, delay = 300) {
    let timerId;

    return function (...args) {
      clearTimeout(timerId);

      timerId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  useEffect(() => {
    setIsVerifying(true);
    fetchProducts();
    fetchCartProducts();
  }, []);

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (isVerifying || !products) {
    return <FullPageLoader />;
  }

  return (
    <div className="product-list container-90">
      {products &&
        products.map((product) => {
          return (
            <ProductCard
              key={product._id}
              product={product}
              setCartProducts={setCartProducts}
              debounce={debounce}
            />
          );
        })}
      {showCart && (
        <CartSidebar
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
          debounce={debounce}
        />
      )}
    </div>
  );
}

export default HomePage;
