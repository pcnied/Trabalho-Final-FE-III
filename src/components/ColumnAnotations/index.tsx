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
				<Typography
					variant="h3"
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					ANOTAÇÕES
				</Typography>
			</Grid>

			<Divider />
			<Grid item>
				{listaAnotations
					.filter(
						(anotation) => anotation.criadoPor === usuarioLogado,
					)
					.map((anotation) => {
						return (
							<ItemAnotation
								key={anotation.id}
								anotation={anotation}
							/>
						);
					})}
			</Grid>
		</>
	);
};

export default ColumnAnotation;
