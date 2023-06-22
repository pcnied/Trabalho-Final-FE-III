import { Grid } from '@mui/material';
import React from 'react';

interface SectionProps {
	context?: 'home' | 'anotations';
}

const Section: React.FC<SectionProps> = ({ context }) => {
	return (
		<Grid container>
			<Grid
				sx={{
					display: 'flex',
					justifyContent: 'center',
				}}
				xs={6}
				item
			>
				{context === 'home' ? <h1>HOME</h1> : <h1>MELANCIAS</h1>}
			</Grid>
			<Grid xs={6} item></Grid>
		</Grid>
	);
};

export default Section;
