// src/redux/Pasteslice.js
import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
  Paste: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

export const Pasteslice = createSlice({
  name: "Pastes",
  initialState,
  reducers: {
    //  ADD
    addTopaste: (state, action) => {
      const paste = action.payload;
      state.Paste.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.Paste));
      toast.success("Paste created successfully");
    },

    //  UPDATE
    updatedTopaste: (state, action) => {
      const updatedPaste = action.payload;
      const index = state.Paste.findIndex(p => p._id === updatedPaste._id);

      if (index !== -1) {
        state.Paste[index] = updatedPaste;
        localStorage.setItem("pastes", JSON.stringify(state.Paste));
        toast.success("Paste updated successfully");
      } else {
        toast.error("Paste not found!");
      }
    },

    //  DELETE
    RemoveFrompaste: (state, action) => {
      const idToRemove = action.payload;
      state.Paste = state.Paste.filter(paste => paste._id !== idToRemove);
      localStorage.setItem("pastes", JSON.stringify(state.Paste));
      toast.success("Paste deleted successfully");
    },

    //  RESET ALL
    ResetALLpaste: (state) => {
      state.Paste = [];
      localStorage.removeItem("pastes");
      toast.success("All pastes cleared");
    },
  },
});

export const {
  addTopaste,
  updatedTopaste,
  ResetALLpaste,
  RemoveFrompaste
} = Pasteslice.actions;

export default Pasteslice.reducer;
