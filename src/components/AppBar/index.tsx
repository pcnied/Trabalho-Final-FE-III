import { Home } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';

const ResponsiveAppBar: React.FC = () => {
	const navigate = useNavigate();
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ background: 'white' }}>
				<Toolbar
					sx={{ display: 'flex', justifyContent: 'space-between' }}
				>
					<IconButton sx={{ color: 'black' }}>
						<Home onClick={() => navigate('/home')} />
					</IconButton>
					{/* <IconButton sx={{ color: 'black' }}>
						<ListAltOutlined
							onClick={() => navigate('/anotations')}
						/>
					</IconButton> */}
					{/* <IconButton sx={{ color: 'black' }}>
						<LogoutOutlined onClick={() => navigate('/')} />
					</IconButton> */}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default ResponsiveAppBar;
