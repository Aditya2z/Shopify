import React from 'react';
import Product from './Product';
// import { products } from '../data.json';
function Products(props) {
  let { activeSizes, activeOrder, products, handleSortByPrice, addToCart } =
    props;
  function getProductToRender() {
    if (activeSizes.length !== 0) {
      products = products.filter((product) => {
        for (let index = 0; index < products.length; index++) {
          if (activeSizes.includes(product.availableSizes[index])) {
            return product;
          }
        }
      });
    }

    if (activeOrder === 'l-h') {
      products = products.sort((a, b) => {
        return a.price - b.price;
      });
    } else if (activeOrder === 'h-l') {
      products = products.sort((a, b) => {
        return b.price - a.price;
      });
    }
    return products;
  }

  return (
    <section className="flex-80 pt-2">
      <div className="flex justify-between">
        <p className="text-sm font-light">
          {getProductToRender().length} Product(s) found
        </p>
        <div className="flex items-center">
          <h3 className="font-light mr-2">Order by</h3>
          <select
            name=""
            id=""
            className="font-light border p-1.5 hover:bg-gray-400"
            onChange={handleSortByPrice}
          >
            <option value="default">Select</option>
            <option value="l-h">Lowest to highest</option>
            <option value="h-l">Highest to lowest </option>
          </select>
        </div>
      </div>
      <ul className="flex pt-5 flex-wrap">
        {getProductToRender().map((product, index) => (
          <Product
            product={product}
            index={index}
            addToCart={addToCart}
            key={index}
          />
        ))}
      </ul>
    </section>
  );
}

export default Products;
