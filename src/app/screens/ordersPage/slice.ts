import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

// Orders sahifasining boshlang'ich holati
const initialState: OrdersPageState = {
  pausedOrders: [],
  processOrders: [],
  finishedOrders: [],
};

// Orders sahifasi uchun slice (Redux reducers)
const ordersPageSlice = createSlice({
  name: "ordersPage",
  initialState,
  reducers: {
    setPausedOrders: (state, action) => {
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

// Action larni export qilamiz
export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
  ordersPageSlice.actions;

// Reducer ni export qilamiz
const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
