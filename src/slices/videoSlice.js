// slices/videoSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ApiFetch } from "../assets/ApiFetch";

export const fetchVideos = createAsyncThunk(
  "videos/fetchVideos",
  async ({ selectedCategory, pageToken }) => {
    const params = `search?part=snippet&q=${selectedCategory}&pageToken=${pageToken}`;
    const data = await ApiFetch(params);
    return data;
  }
);

const videoSlice = createSlice({
  name: "videos",
  initialState: {
    items: [],
    nextPageToken: "",
    loading: false,
    initialLoading: true,
  },
  reducers: {
    resetVideos(state) {
      state.items = [];
      state.nextPageToken = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.items.push(...action.payload.items);
        state.nextPageToken = action.payload.nextPageToken;
        state.loading = false;
        state.initialLoading = false;
      })
      .addCase(fetchVideos.rejected, (state) => {
        state.loading = false;
        state.initialLoading = false;
      });
  },
});

export const { resetVideos } = videoSlice.actions;
export default videoSlice.reducer;
