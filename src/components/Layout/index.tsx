import { Box } from '@mui/material';

interface LayoutProps {
	children: React.ReactNode;
}

const background = '#191970';

const Layout: React.FC<LayoutProps> = ({ children }) => {
	return (
		<Box
			sx={{
				padding: '0px',
				margin: '0px',
				zIndex: '-1',
				height: '100vh',
				background: `linear-gradient(250deg, white 0%, white 50%, ${background} 50%, ${background} 100%) no-repeat fixed`,
			}}
		>
			{children}
		</Box>
	);
};

export default Layout;
