import { Box, Typography } from '@mui/material';

import { TextProps } from '../../types/TextProps';

interface LoginTextProps {
	phrases: TextProps[];
}

const LoginText: React.FC<LoginTextProps> = ({ phrases }) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
			}}
			gap={2}
		>
			{phrases.map(({ phrase }) => {
				return (
					<>
						<Typography variant="h4">{phrase}</Typography>
					</>
				);
			})}
		</Box>
	);
};

export default LoginText;
