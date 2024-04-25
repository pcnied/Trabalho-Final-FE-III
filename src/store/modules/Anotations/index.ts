import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../..';
import Anotations from '../../../types/Anotations';

const anotationsAdapter = createEntityAdapter<Anotations>({
	selectId: (anotation) => anotation.id,
});

export const { selectAll: findAllAnotations } = anotationsAdapter.getSelectors(
	(state: RootState) => state.anotations,
);

const anotationSlice = createSlice({
	name: 'anotation',
	initialState: anotationsAdapter.getInitialState(),
	reducers: {
		createAnotation: anotationsAdapter.addOne,
		deleteAnotation: anotationsAdapter.removeOne,
		updateAnotation: anotationsAdapter.updateOne,
	},
});

export const { createAnotation, deleteAnotation, updateAnotation } =
	anotationSlice.actions;
export default anotationSlice.reducer;
