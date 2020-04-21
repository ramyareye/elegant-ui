import {createSlice} from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: {language: {isRTL: true, name: 'fa'}},
  reducers: {
    changeLanguage(state, action) {
      const {isRTL, name} = action.payload;
      state.language.name = name;
      state.language.isRTL = isRTL;
    },
  },
});

export const {
  changeLanguage,
} = appSlice.actions;

export default appSlice.reducer;
