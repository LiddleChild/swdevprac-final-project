import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BookState = {
  bookItems: BookingItem[];
};

const initialState: BookState = {
  bookItems: [],
};

export const bookSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    addBooking(state: BookState, action: PayloadAction<BookingItem>) {
      const index = state.bookItems.findIndex((value) => value.id === action.payload.id);

      if (index >= 0) {
        let tmp = [...state.bookItems];
        tmp[index] = action.payload;
        return { bookItems: [...tmp] };
      } else {
        return { bookItems: [...state.bookItems, action.payload] };
      }
    },
    removeBooking(state: BookState, action: PayloadAction<string>) {
      const index = state.bookItems.findIndex((value) => value.id === action.payload);
      if (index > -1) {
        let tmp = [...state.bookItems];
        tmp.splice(index, 1);
        return { bookItems: [...tmp] };
      }

      return state;
    },
  },
});

export const { addBooking, removeBooking } = bookSlice.actions;
export default bookSlice.reducer;
