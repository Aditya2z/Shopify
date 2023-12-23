import React from 'react';
import Lodash from 'lodash';
// import { products } from '../data.json';
function Aside(props) {
  let { activeSizes, products, handleSortBySize } = props;
  let sizes = products.reduce((acc, cv) => {
    acc = acc.concat(cv.availableSizes);
    return acc;
  }, []);
  let uniqSizes = Lodash.uniq(sizes);

  return (
    <section className="flex-15 mr-2">
      <h3 className="font-medium text-lg">Sizes:</h3>
      <div className="flex flex-wrap mt-6">
        {uniqSizes.map((size, index) => (
          <div key={index}>
            <label
              htmlFor={size}
              className={
                activeSizes.indexOf(size) !== -1
                  ? 'rounded-full inline-block text-xs font-light w-9 h-9 leading-9 text-center mr-2 mb-4 bg-black text-white'
                  : 'rounded-full inline-block text-xs font-light bg-gray-200 w-9 h-9 leading-9 text-center mr-2 mb-4 hover:bg-gray-400'
              }
            >
              {size}
            </label>
            <input
              type="checkbox"
              id={size}
              name={size + index}
              value={size}
              className="border hidden"
              onChange={handleSortBySize}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Aside;
