import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  results: [],
  // details: [],
  searchTitle: "",
  status: "idle",
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    lastSearch: (state, action) => {
      state.searchTitle = action.payload.title;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchMoviesByPage.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchMoviesByPage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.results = action.payload;
      })
      .addCase(fetchMoviesByPage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const fetchMovies = createAsyncThunk(
  "search/fetchMovies",
  async (title) => {
    const response = await axios
      .get(
        `http://www.omdbapi.com/?apikey=7819d7f3&s=${title}&page=1&type=movie`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err.message));
    return response;
  }
);

export const fetchMoviesByPage = createAsyncThunk(
  "search/fetchMoviesByPage",
  async ({ title, page }) => {
    const response = await axios
      .get(
        `http://www.omdbapi.com/?apikey=7819d7f3&s=${title}&page=${page}&type=movie`
      )
      .then((res) => res.data)
      .catch((err) => console.log(err.message));
    return response;
  }
);
// export const fetchMovieDetails = createAsyncThunk(
//   "search/fetchMovieDetails",
//   async (id) => {
//     const response = await axios
//       .get(`http://www.omdbapi.com/?apikey=7819d7f3&i=${id}`)
//       .then((res) => res.data)
//       .catch((err) => console.log(err.message));
//     return response;
//   }
// );

export const getSearchResults = (state) => state.search.results;

export const getSearchTitle = (state) => state.search.searchTitle;

export const { lastSearch } = searchSlice.actions;

export default searchSlice.reducer;
