import { GlobalState } from "@/utils/interfaces";
import { PayloadAction } from "@reduxjs/toolkit";

export const globalActions = {
  setDarkMode: (state: GlobalState, action: PayloadAction<boolean>) => {
    state.darkMode = action.payload;
  },
};
