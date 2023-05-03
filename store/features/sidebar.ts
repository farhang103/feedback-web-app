import {createSlice} from "@reduxjs/toolkit";
const sideBarSlice = createSlice({
  name: "sidebar",
  initialState: {
    open: false,
  },
  reducers: {
    showSideBar: (sideBar) => {
      sideBar.open = true;
    },
    hideSideBar: (sideBar) => {
      sideBar.open = false;
    },
  },
});

export const {showSideBar, hideSideBar} = sideBarSlice.actions;
export default sideBarSlice.reducer;
