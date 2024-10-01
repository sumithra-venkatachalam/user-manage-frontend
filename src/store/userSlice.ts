import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User {
  id: string;
  username: string;
  phone: string;
}

interface UserState {
  users: User[];
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  loading: false,
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get('http://localhost:3000/api/users');
  return response.data;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const index = state.users.findIndex(user => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
    });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
