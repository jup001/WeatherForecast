import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '../Services/weatherApi';  


export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware), 
});