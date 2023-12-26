import { configureStore } from "@reduxjs/toolkit";
import APISlice from "./APISlice";

export default configureStore({
    reducer: {
        APISlice: APISlice
    }
})