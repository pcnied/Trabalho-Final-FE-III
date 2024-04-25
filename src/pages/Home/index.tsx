import { Grid } from '@mui/material';

import ResponsiveAppBar from '../../components/AppBar';
import CardAnotations from '../../components/CardAnotations';

const Home = () => {
	return (
		<>
			<ResponsiveAppBar />
			<Grid
				container
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Grid item xs={12} sm={12}>
					<CardAnotations />
				</Grid>
			</Grid>
		</>
	);
};

export default Home;
