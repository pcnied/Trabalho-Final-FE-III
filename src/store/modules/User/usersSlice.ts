import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';

interface User {
	email: string;
	password: string;
}

const usersAdapter = createEntityAdapter<User>({
	selectId: (state) => state.email,
});

export const { selectAll, selectById } = usersAdapter.getSelectors(
	(global: RootState) => global.users,
);

const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState(),
	reducers: {
		createUser: usersAdapter.addOne,
	},
});

export const { createUser } = usersSlice.actions;

export default usersSlice.reducer;
