import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI } from '../../services/authAPI';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  const res = await loginAPI(credentials);
  return res.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false },
  reducers: {
    logout: (state) => {
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loading = false;
      });
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
