import { Link } from 'react-router-dom';
import { Rating, Star } from '@smastrom/react-rating';

const myStyles = {
  itemShapes: Star,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9',
};

export default function Product({ product }) {
  return (
    <div className="text-left">
      <div>
        <Link to={`product/${product.id}`}>
          <div className="text-center">
            <img
              src={product.image}
              className="img-fluid w-60 h-60 mx-auto"
              alt={product.name}
            />
          </div>
          <h1 className="text-xl font-semibold">{product.name}</h1>

          <Rating
            value={product.rating}
            readOnly={true}
            itemStyles={myStyles}
            style={{ maxWidth: 250 }}
          />

          <h1 className="text-lg font-semibold">Price: {product.price}</h1>
        </Link>
      </div>
    </div>
  );
}
