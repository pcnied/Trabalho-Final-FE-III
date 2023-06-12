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
		adicionarAnotacao: anotationsAdapter.addOne,
		deletarAnotacao: anotationsAdapter.removeOne,
		editarAnotacao: anotationsAdapter.updateOne,
	},
});

export const { adicionarAnotacao, deletarAnotacao, editarAnotacao } =
	anotationSlice.actions;
export default anotationSlice.reducer;
