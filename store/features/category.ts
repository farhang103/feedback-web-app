import {createSlice, PayloadAction} from "@reduxjs/toolkit";
const categorySlice = createSlice({
  name: "category",
  initialState: "All",
  reducers: {
    addCurrentCategory: (category, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const {addCurrentCategory} = categorySlice.actions;
export default categorySlice.reducer;
