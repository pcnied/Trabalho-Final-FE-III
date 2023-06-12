import { combineReducers } from '@reduxjs/toolkit';

import anotationSlice from '../modules/Anotations';
import modalSlice from '../modules/ModalAnotations';
import userSlice from './User/usersSlice';

const rootReducer = combineReducers({
	// contacts:
	users: userSlice,
	modal: modalSlice,
	anotations: anotationSlice,
});

export default rootReducer;
