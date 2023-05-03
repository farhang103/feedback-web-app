import {createSlice, PayloadAction} from "@reduxjs/toolkit";
const upVoteSlice = createSlice({
  name: "upVotes",
  initialState: [],
  reducers: {
    addVote: (upVotes, action: PayloadAction<{id: number}>) => {
      upVotes.push(action.payload.id);
    },
    deleteVote: (upVotes, action: PayloadAction<{id: number}>) => {
      return upVotes.filter((upVote) => upVote === action.payload.id);
    },
  },
});

export const {addVote, deleteVote} = upVoteSlice.actions;
export default upVoteSlice.reducer;
