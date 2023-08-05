import { Delete, Edit } from '@mui/icons-material';
import { Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
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
			<Grid
				xs={12}
				key={anotation.id}
				container
				marginY={2}
				flexDirection="column"
				sx={{
					border: '1px solid black',
					borderRadius: '5px',
					padding: '10px',
				}}
			>
				<Grid xs={12}>
					<Typography variant="h5">{anotation.titulo}</Typography>
				</Grid>
				<Divider
					sx={{
						width: '100%',
						background: 'black',
						marginY: '8px',
						display: 'flex',
						justifyContent: 'center',
					}}
				></Divider>
				<Grid xs={12}>
					<Typography>{anotation.descricao}</Typography>
				</Grid>
				<Grid xs={12}>
					<Typography>{anotation.criadoEm}</Typography>
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
