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
	const [update, setUpdate] = useState(false);

	return (
		<>
			<Grid
				key={anotation.id}
				container
				marginY={2}
				flexDirection="column"
				sx={{
					border: '1px solid black',
					borderRadius: '5px',
					padding: '10px',
					maxWidth: '100%',
				}}
			>
				<Grid item xs={12}>
					<Typography sx={{ wordWrap: 'break-word' }} variant="h4">
						{anotation.title}
					</Typography>
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
				<Grid item xs={12}>
					<Typography sx={{ wordWrap: 'break-word' }} variant="h6">
						{anotation.description}
					</Typography>
				</Grid>
				<Grid>
					<Typography>{anotation.createdAt}</Typography>
				</Grid>
				<Grid item>
					<Stack direction="row" spacing={2}>
						<IconButton
							color="error"
							aria-label="delete"
							onClick={() => {
								setOpen(true);
								setDeletar(true);
								setUpdate(false);
							}}
						>
							<Delete />
						</IconButton>
						<IconButton
							aria-label="edit"
							onClick={() => {
								setOpen(true);
								setUpdate(true);
								setDeletar(false);
							}}
						>
							<Edit />
						</IconButton>
					</Stack>
				</Grid>
			</Grid>

			<ModalAnotations
				context={deletar ? 'delete' : 'update'}
				open={open}
				setOpen={setOpen}
				anotation={anotation}
			/>
		</>
	);
};

export default ItemAnotation;
