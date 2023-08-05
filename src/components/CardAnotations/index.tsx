import { Add } from '@mui/icons-material';
import { Fab, Grid, Paper } from '@mui/material';
import React, { useState } from 'react';

import ColumnAnotation from '../ColumnAnotations';
import ModalAnotations from '../ModalAnotations';

const CardAnotations: React.FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<Paper
						square
						sx={{
							height: 'max-content',
							paddingY: 3,
							marginBottom: 4,
							margin: 3,
							borderRadius: '10px',
						}}
					>
						<Grid container xs={12} margin={1}>
							<ColumnAnotation />
						</Grid>
					</Paper>
				</Grid>
			</Grid>
			<Fab
				variant="extended"
				sx={{ position: 'fixed', bottom: '30px', right: '30px' }}
				onClick={() => setOpen(true)}
			>
				<Add />
				Adicionar Anotação
			</Fab>
			<ModalAnotations contexto={'criar'} open={open} setOpen={setOpen} />
		</>
	);
};

export default CardAnotations;
