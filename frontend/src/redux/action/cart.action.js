export const addToCart = (product, quantity) => (dispatch, getState) => {
  const cartItems = {
    name: product.name,
    _id: product.id,
    price: product.price,
    countInStock: product.countInStock,
    quantity: quantity,
  };

  dispatch({ type: "ADD_TO_CART", payload: cartItems });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};

export const deleteFromCart = (item) => (dispatch, getState) => {
  dispatch({
    type: "DELETE_FROM_CART",
    payload: item,
  });

  localStorage.setItem(
    "cartItems",
    JSON.stringify(getState().cartReducer.cartItems)
  );
};
