import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterProducts } from '../redux/product.slice';

export default function Filter() {
  const [searchkey, setSearchKey] = useState('');
  const [sort, setSort] = useState('popular');
  const [category, setCategory] = useState('all');

  const dispatch = useDispatch();

  return (
    <div>
      <div className="flex justify-center shadow p-3 mb-5 bg-white rounded">
        <div className="mr-2">
          <input
            value={searchkey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            type="text"
            placeholder="Search products"
            className="form-input"
          />
        </div>
        <div className="mr-2">
          <select
            className="form-select"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value="popular">Popular</option>
            <option value="htl">High to Low</option>
            <option value="lth">Low to High</option>
          </select>
        </div>
        <div className="mr-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="mobiles">Mobiles</option>
            <option value="games">Games</option>
          </select>
        </div>
        <div>
          <button
            class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => {
              dispatch(filterProducts(searchkey, sort, category));
            }}
          >
            FILTER
          </button>
        </div>
      </div>
    </div>
  );
}
