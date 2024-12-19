import { configureStore } from "@reduxjs/toolkit";
import deleteSlice from "./slices/deleteSlice";

const store = configureStore({
  reducer: {
    delete: deleteSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["delete/showDialog"],
      },
    }),
});

export default store;
