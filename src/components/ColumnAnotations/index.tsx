import { Divider, Grid, Typography } from '@mui/material';
import React from 'react';

import { useAppSelector } from '../../store/hooks';
import { findAllAnotations } from '../../store/modules/Anotations';
import ItemAnotation from '../ItemAnotations';

const ColumnAnotation: React.FC = () => {
	const listAnotations = useAppSelector(findAllAnotations);

	const userLogged = JSON.parse(sessionStorage.getItem('userLogged') || '');

	return (
		<>
			<Grid item xs={12} sm={12}>
				<Typography
					variant="h3"
					sx={{ display: 'flex', justifyContent: 'center' }}
				>
					ANOTAÇÕES
				</Typography>
			</Grid>

			<Divider />

			<Grid container spacing={2}padding={2}>
				{listAnotations
					.filter((anotation) => anotation.createdBy === userLogged)
					.map((anotation) => (
						<Grid item xs={12} sm={4} key={anotation.id}>
							<ItemAnotation anotation={anotation} />
						</Grid>
					))}
			</Grid>
		</>
	);
};

export default ColumnAnotation;
