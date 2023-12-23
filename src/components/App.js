//change isCartOpen
import { useState } from 'react';
import { products } from '../data.json';
import Aside from './Aside';
import Products from './Products';
import Cart from './Cart';
function App() {
  const [activeSizes, setActiveSizes] = useState([]);
  const [activeOrder, setActiveOrder] = useState('default');
  const [cart, setCart] = useState({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleSortBySize = (event) => {
    let { value } = event.target;
    console.log(activeSizes);
    let sizes = activeSizes;
    if (sizes.indexOf(value) === -1) {
      sizes.push(value);
    } else {
      sizes.splice(sizes.indexOf(value), 1);
    }
    setActiveSizes([...sizes]);
  };
  const handleSortByPrice = (event) => {
    setActiveOrder(event.target.value);
  };
  const addToCart = (index) => {
    let cartItems = cart;
    let keys = Object.keys(cartItems);
    if (keys.indexOf(String(index)) !== -1) {
      cartItems[index] = Number(cartItems[index]) + 1;
    } else {
      cartItems[index] = 1;
    }
    setCart({ ...cartItems });
    setIsCartOpen(true);
  };
  const decreaseQuantity = (index) => {
    let cartItems = cart;
    if (cartItems[index] > 1) {
      cartItems[index] = Number(cartItems[index]) - 1;
      setCart({ ...cartItems });
    } else {
      return;
    }
  };
  const removeFromCart = (index) => {
    let cartItems = cart;
    delete cartItems[index];
    setCart({ ...cartItems });
  };
  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <main className="flex container">
      <Aside
        activeSizes={activeSizes}
        handleSortBySize={handleSortBySize}
        products={products}
      />
      <Products
        products={products}
        activeSizes={activeSizes}
        activeOrder={activeOrder}
        addToCart={addToCart}
        handleSortByPrice={handleSortByPrice}
      />
      <Cart
        products={products}
        cart={cart}
        addToCart={addToCart}
        decreaseQuantity={decreaseQuantity}
        removeFromCart={removeFromCart}
        handleCartToggle={handleCartToggle}
        isCartOpen={isCartOpen}
      />
    </main>
  );
}

export default App;
