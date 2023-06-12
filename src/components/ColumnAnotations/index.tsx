import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';

import { useAppSelector } from '../../store/hooks';
import { findAllAnotations } from '../../store/modules/Anotations';
import ItemAnotation from '../ItemAnotations';

const ColumnAnotation: React.FC = () => {
	const listaAnotations = useAppSelector(findAllAnotations);

	const usuarioLogado = JSON.parse(
		sessionStorage.getItem('userLogged') || '',
	);

	return (
		<>
			<Grid item xs={12}>
				<Typography variant="h4" padding={2}>
					ANOTAÇÕES
				</Typography>
			</Grid>

			<Divider />
			{listaAnotations
				.filter((anotation) => anotation.criadoPor === usuarioLogado)
				.map((anotation) => {
					return (
						<ItemAnotation
							key={anotation.id}
							anotation={anotation}
						/>
					);
				})}
		</>
	);
};

export default ColumnAnotation;
