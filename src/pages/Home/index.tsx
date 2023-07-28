import { Grid } from '@mui/material';

import ResponsiveAppBar from '../../components/AppBar';
import CardAnotations from '../../components/CardAnotations';
import Section from '../../components/Section';

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
				<Section />
				<CardAnotations />
			</Grid>
		</>
	);
};

export default Home;
