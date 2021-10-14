import axios from "axios";
export const getAllProducts = () => (dispatch) => {
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/product")
    .then((res) => {
      console.log(res);

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: "GET_PRODUCTS_FAILED", payload: err });
    });
};

export const filterProducts = (searchKey, sortKey, category) => (dispatch) => {
  var filteredproducts;
  dispatch({ type: "GET_PRODUCTS_REQUEST" });

  axios
    .get("/product")
    .then((res) => {
      filteredproducts = res.data;

      if (searchKey) {
        filteredproducts = res.data.filter((product) => {
          return product.name.toLowerCase().includes(searchKey);
        });
      }

      if (sortKey !== "popular") {
        if (sortKey === "htl") {
          filteredproducts = res.data.sort((a, b) => {
            return -a.price + b.price;
          });
        } else {
          filteredproducts = res.data.sort((a, b) => {
            return a.price - b.price;
          });
        }
      }

      if (category !== "all") {
        filteredproducts = res.data.filter((product) => {
          return product.category.toLowerCase().includes(category);
        });
      }

      dispatch({ type: "GET_PRODUCTS_SUCCESS", payload: filteredproducts });
    })
    .catch((err) => {
      dispatch({ type: "GET_PRODUCTS_FAILED" });
    });
};

export const AuthHeader = (currentUser) => {
  if (currentUser && currentUser.jwtToken) {
    return { Authorization: "Bearer " + currentUser.jwtToken }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {};
  }
};

export const addProductReview =
  (review, productid) => async (dispatch, getState) => {
    dispatch({ type: "ADD_PRODUCT_REVIEW_REQUEST" });
    const currentUser = getState().loginReducer.currentUser;

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + currentUser.jwtToken,
      },
      body: JSON.stringify({
        rating: review.rating,
        comment: review.comment,
      }),
    };

    const response = await fetch(`/review/create/${productid}`, requestOptions);

    if (!response.ok) {
      console.log("Error");
    } else {
      console.log("Bisa");
    }

    // axios
    //   .post(`/review/coba`, review, {
    //     headers: AuthHeader(currentUser),
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     dispatch({ type: "ADD_PRODUCT_REVIEW_SUCCESS" });
    //     alert("Your review submitted successfully");
    //     window.location.reload();
    //   })
    //   .catch((err) => {
    //     dispatch({ type: "ADD_PRODUCT_REVIEW_FAILED" });
    //   });
  };

export const getProductById = (productid) => (dispatch) => {
  dispatch({ type: "GET_PRODUCTBYID_REQUEST" });
  axios
    .get(`/product/${productid}`)
    .then((res) => {
      console.log(res.data);

      dispatch({ type: "GET_PRODUCTBYID_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: "GET_PRODUCTBYID_FAILED",
        payload: err,
      });
    });
};

export const deleteProduct = (productid) => (dispatch) => {
  dispatch({ type: "DELETE_PRODUCT_REQUEST" });

  axios
    .delete(`/product/${productid}`)
    .then((res) => {
      dispatch({ type: "DELETE_PRODUCT_SUCCESS", payload: res.data });
      alert("Product deleted successfully");
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "DELETE_PRODUCT_FAILED", payload: err });
    });
};

export const addProduct = (product) => (dispatch) => {
  dispatch({ type: "ADD_PRODUCT_REQUEST" });
  console.log(product);

  axios
    .post("/product", product)
    .then((res) => {
      console.log(res);
      dispatch({ type: "ADD_PRODUCT_SUCCESS" });
      window.location.reload();
    })
    .catch((err) => {
      dispatch({ type: "ADD_PRODUCT_FAILED" });
    });
};

export const updateProduct = (productid, updatedproduct) => (dispatch) => {
  dispatch({ type: "UPDATE_PRODUCT_REQUEST" });

  axios
    .put(`/product/${productid}`, updatedproduct)
    .then((res) => {
      console.log(res);
      dispatch({ type: "UPDATE_PRODUCT_SUCCESS" });
      window.location.href = "/admin/productslist";
    })
    .catch((err) => {
      dispatch({ type: "UPDATE_PRODUCT_FAILED" });
    });
};
