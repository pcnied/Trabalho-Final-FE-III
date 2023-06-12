import { Alert } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import * as React from 'react';

interface SnackBarCompProps {
	message: string;
	isOpen: boolean;
	handleClose: (event: React.SyntheticEvent | Event, reason?: string) => void;
}

export const SnackBarComp: React.FC<SnackBarCompProps> = ({
	message,
	isOpen,
	handleClose,
}) => {
	return (
		<div>
			<Snackbar
				open={isOpen}
				onClose={handleClose}
				autoHideDuration={4000}
			>
				<Alert severity="error">{message}</Alert>
			</Snackbar>
		</div>
	);
};
