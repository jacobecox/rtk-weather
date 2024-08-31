import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SearchState {
  query: string;
}

const initialState: SearchState = {
  query: "",
};

//use this slice to retrieve the search query from SearchBar and use in the store
const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    //PayloadAction states the type of data included in the action.payload below
    setSearchQuery(state, action: PayloadAction<string>) {
      state.query = action.payload; //state.query is where the query is stored
    },
  },
});

export const { setSearchQuery } = searchSlice.actions;
export default searchSlice.reducer;
