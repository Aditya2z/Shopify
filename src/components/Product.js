function Product(props){
    const getDollar = (price) => {
      price = String(price);
      if (price.indexOf('.') === -1) {
        return price;
      } else {
        return price.slice(0, price.indexOf('.'));
      }
    };
    const getCent = (price) => {
      price = String(price);
      if (price.indexOf('.') === -1) {
        return '';
      } else {
        return price.slice(price.indexOf('.'));
      }
    };
    return(
      <li
                key={props.product.id}
                className="flex-25 text-center hover:shadow-2xl p-3 mb-6 relative"
              >
                <img
                  src={'/static/products/' + props.product.sku + '_1.jpg'}
                  className="h-333 object-cover"
                  alt="tshirts"
                />
                <h3 className="mt-4">{props.product.title}</h3>
                <div className="bg-primary w-4 h-0.5 inline-block mt-4 mb-2"></div>
                <h2 className="text-2xl">
                  <small className="text-sm">$</small>
                  {getDollar(props.product.price)}
                  <small className="text-sm">{getCent(props.product.price)}</small>
                </h2>
                <h2 className="text-xl text-gray-400">
                  <small className="text-sm">or {props.product.installments} x</small>$
                  {(props.product.price / props.product.installments).toFixed(2)}
                </h2>
                <button
                  className="bg-black text-white w-full py-3 mt-2 hover:bg-yellow-400"
                  onClick={() => {props.addToCart(props.index)}}
                >
                  Add to cart
                </button>
                {props.product.isFreeShipping ? (
                  <span className="absolute top-0 right-4 text-xs p-1 bg-black text-white font-light">
                    Free shipping
                  </span>
                ) : (
                  <span className="absolute top-0 right-4 text-xs p-1 bg-black text-white font-light hidden">
                    Free shipping
                  </span>
                )}
              </li>
    )
  }

  export default Product;