import { Delete, Edit } from '@mui/icons-material';
import { Grid, IconButton, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

import Anotations from '../../types/Anotations';
import ModalAnotations from '../ModalAnotations';

interface ItemAnotationProps {
	anotation: Anotations;
}

const ItemAnotation: React.FC<ItemAnotationProps> = ({ anotation }) => {
	const [open, setOpen] = useState(false);
	const [deletar, setDeletar] = useState(false);
	const [modificar, setModificar] = useState(false);

	return (
		<>
			<Grid key={anotation.id} container marginY={2}>
				<Grid xs={12}>
					<Typography variant="h5">{anotation.titulo}</Typography>
				</Grid>
				<Grid xs={6}>
					<Typography>Descrição: {anotation.descricao}</Typography>
				</Grid>
				<Grid xs={6}>
					<Typography>Data: {anotation.criadoEm}</Typography>
				</Grid>
				<Grid item xs={12}>
					<Stack direction="row" spacing={2}>
						<IconButton
							color="error"
							aria-label="delete"
							onClick={() => {
								setOpen(true);
								setDeletar(true);
								setModificar(false);
							}}
						>
							<Delete />
						</IconButton>
						<IconButton
							aria-label="edit"
							onClick={() => {
								setOpen(true);
								setModificar(true);
								setDeletar(false);
							}}
						>
							<Edit />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>
			<ModalAnotations
				contexto={deletar ? 'deletar' : 'modificar'}
				open={open}
				setOpen={setOpen}
				anotation={anotation}
			/>
		</>
	);
};

export default ItemAnotation;
