import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const registerNewUser = createAsyncThunk(
  'user/registerNewUser',
  async (user, { rejectWithValue }) => {
    try {
      console.log(user)
      const response = await axios.post('/api/users', user);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', user);

    
      localStorage.setItem('currentUser', JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('cartItems');
      return;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async ({ userid, updateUser }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/users/${userid}`, updateUser);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  'user/getAllUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/users');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (userid, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/api/users/${userid}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState: { loading: false, success: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(registerNewUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerNewUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

const currentUser = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser'))
  : null;

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    loading: false,
    success: false,
    error: null,
    currentUser: currentUser,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.currentUser = action.payload; // Set the currentUser from the action payload
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.currentUser = null; // Clear the currentUser when logging out
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const updateSlice = createSlice({
  name: 'update',
  initialState: { loading: false, success: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const getAllUsersSlice = createSlice({
  name: 'getAllUsers',
  initialState: { loading: false, users: [], error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.users = [];
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState: { loading: false, success: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {
//   registerNewUserSuccess,
//   loginUserSuccess,
//   logoutUserSuccess,
//   updateUserSuccess,
//   getAllUsersSuccess,
//   deleteUserSuccess,
// } = {
//   registerNewUserSuccess: registerUserSlice.actions,
//   loginUserSuccess: loginSlice.actions,
//   logoutUserSuccess: loginSlice.actions,
//   updateUserSuccess: updateSlice.actions,
//   getAllUsersSuccess: getAllUsersSlice.actions,
//   deleteUserSuccess: deleteUserSlice.actions,
// };

// export const selectRegisterUser = (state) => state.registerUser;
// export const selectLogin = (state) => state.login;
// export const selectUpdate = (state) => state.update;
// export const selectAllUsers = (state) => state.getAllUsers;
// export const selectDeleteUser = (state) => state.deleteUser;

export default {
  registerUserSlice: registerUserSlice.reducer,
  loginSlice: loginSlice.reducer,
  updateSlice: updateSlice.reducer,
  getAllUsersSlice: getAllUsersSlice.reducer,
  deleteUserSlice: deleteUserSlice.reducer,
};
