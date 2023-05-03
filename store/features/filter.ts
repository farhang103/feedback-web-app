import {createSlice, PayloadAction} from "@reduxjs/toolkit";
const upVoteSlice = createSlice({
  name: "filter",
  initialState: "Most Upvotes",
  reducers: {
    addFilter: (filter, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const {addFilter} = upVoteSlice.actions;
export default upVoteSlice.reducer;
