import { configureStore } from '@reduxjs/toolkit';
import getInfoReducer from '../features/counter/getInfo/getDetails'

export default configureStore({
  reducer: {
    bikeInfo : getInfoReducer,
    //collisionInfo : collisionInfoReducer
  },
});
