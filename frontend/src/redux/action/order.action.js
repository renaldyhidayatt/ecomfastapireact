import axios from "axios";

export const placeOrder = (token, subtotal) => (dispatch, getState) => {
  const currentUser = getState().loginReducer.currentUser;
  const demoItems = getState().cartReducer.cartItems;

  const cartItems = new Array();

  console.log(subtotal);

  for (var i = 0; i < demoItems.length; i++) {
    var item = {
      name: demoItems[i].name,
      quantity: demoItems[i].quantity,
      price: demoItems[i].price,
      id: demoItems[i].id,
    };

    cartItems.push(item);
  }

  dispatch({
    type: "PLACE_ORDER_REQUEST",
  });

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: token,
      cartItems: cartItems,
      currentUser: currentUser,
      subtotal: subtotal,
    }),
  };

  console.log(token, "Ini Token");
  console.log(cartItems, "Ini Cart Items");
  console.log(currentUser, "Ini Current User");
  console.log(subtotal, "Ini Subtotal");

  // fetch("/order", requestOptions)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     if (!res.oke) {
  //       dispatch({ type: "PLACE_ORDER_FAILED" });
  //     }
  //     dispatch({ type: "PLACE_ORDER_SUCCESS" });
  //     console.log(res.data);
  //   })
  //   .catch((err) => console.log(err));

  axios
    .post("/order", { token, subtotal, currentUser, cartItems })
    .then((res) => {
      dispatch({ type: "PLACE_ORDER_SUCCESS" });
      console.log(res);
    })
    .catch((err) => {
      dispatch({ type: "PLACE_ORDER_FAILED" });
    });
};

export const getOrdersByUserId = () => (dispatch, getState) => {
  const userid = getState().loginReducer.currentUser.id;

  dispatch({
    type: "GET_ORDERSBYUSERID_REQUEST",
  });
  console.log(userid);

  axios
    .get(`/order/orderbyuser/${userid}`)
    .then((res) => {
      dispatch({
        type: "GET_ORDERSBYUSERID_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_ORDERSBYUSERID_FAILED",
        payload: err,
      });
    });
};

export const getOrderById = (orderid) => (dispatch, getState) => {
  dispatch({
    type: "GET_ORDERBYID_REQUEST",
  });

  axios
    .get(`/order/orderbyid/${orderid}`)
    .then((res) => {
      dispatch({
        type: "GET_ORDERBYID_SUCCESS",
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: "GET_ORDERBYID_FAILED", payload: err });
    });
};

export const getAllorders = () => (dispatch, getState) => {
  dispatch({
    type: "GET_ALLORDERS_REQUEST",
  });

  axios
    .get("/order")
    .then((res) => {
      dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: res.data });
      console.log(res.data);
    })
    .catch((err) => {
      dispatch({
        type: "GET_ALLORDERS_FAILED",
        payload: err,
      });
    });
};
