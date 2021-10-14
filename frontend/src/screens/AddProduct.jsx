import { useState } from "react";
import Success from "../components/Success";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../redux/action/product.action";

export default function AddProduct() {
  const [name, setname] = useState("");
  const [price, setprice] = useState();
  const [countinstock, setcountinstock] = useState();
  const [imageurl, setimageurl] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const dispatch = useDispatch();

  const addproductstate = useSelector((state) => state.addProductReducer);
  const { success, error, loading } = addproductstate;

  const addproduct = (e) => {
    e.preventDefault();
    const product = {
      name: name,
      image: imageurl,
      category: category,
      description: description,
      price: price,
      countInStock: countinstock,
    };

    dispatch(addProduct(product));
  };

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-8 shadow p-3 mb-5 bg-white rounded">
          {success && <Success success="Product Added Succesfully" />}
          {loading && <Loader />}
          {error && <Error error="Something went wrong" />}

          <h2>Add Product</h2>
          <form onSubmit={addproduct}>
            <input
              type="text"
              className="form-control mb-2 mr-sm-2"
              placeholder="name"
              required
              value={name}
              onChange={(e) => {
                setname(e.target.value);
              }}
            />
            <input
              type="number"
              className="form-control mb-2 mr-sm-2"
              placeholder="price"
              value={price}
              required
              onChange={(e) => {
                setprice(e.target.value);
              }}
            />
            <input
              type="text"
              required
              className="form-control mb-2 mr-sm-2"
              placeholder="decription"
              value={description}
              onChange={(e) => {
                setdescription(e.target.value);
              }}
            />
            <input
              type="text"
              required
              className="form-control mb-2 mr-sm-2"
              placeholder="imageurl"
              value={imageurl}
              onChange={(e) => {
                setimageurl(e.target.value);
              }}
            />
            <input
              type="text"
              required
              className="form-control mb-2 mr-sm-2"
              placeholder="category"
              value={category}
              onChange={(e) => {
                setcategory(e.target.value);
              }}
            />
            <input
              type="number"
              required
              className="form-control mb-2 mr-sm-2"
              placeholder="count in stock"
              value={countinstock}
              onChange={(e) => {
                setcountinstock(e.target.value);
              }}
            />
            <button
              className="btn mt-5"
              type="submit"
              style={{ float: "left" }}
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
