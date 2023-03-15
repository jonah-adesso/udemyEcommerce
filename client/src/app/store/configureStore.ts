import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { basketSlice } from '../../features/basket/basketSlice';
import { catalogSlice } from '../../features/catalog/catalogSlice';
import { counterSlice } from '../../features/contact/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    basket: basketSlice.reducer,
    catalog: catalogSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hook which is already typed, only so we won't have to define
// type all the time when using it
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;