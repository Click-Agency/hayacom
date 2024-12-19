import { ISlice } from "../../types/redux";
import { createSlice } from "@reduxjs/toolkit";

const INITAL_STATE: ISlice["delete"] = {
  show: false,
  target: {
    uniqueId: "",
    uniqueIdentifier: "",
    type: "",
    deleteFunction: undefined,
  },
};

const deleteSlice = createSlice({
  name: "delete",
  initialState: INITAL_STATE,
  reducers: {
    showDialog: (state, action) => {
      state.show = true;
      state.target = action.payload;
    },
    closeDialog: (state) => {
      state.show = false;
      state.target = { uniqueId: "", uniqueIdentifier: "", type: "" };
      state.target.deleteFunction = undefined;
    },
  },
});

export const { closeDialog, showDialog } = deleteSlice.actions;

export default deleteSlice.reducer;
