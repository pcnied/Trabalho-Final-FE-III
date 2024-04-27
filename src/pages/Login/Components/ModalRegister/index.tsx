import { Close } from '@mui/icons-material';
import { Box, Divider, Grid, IconButton, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { SnackBarComp } from '../../../../components/SnackBar';
import { useAppSelector } from '../../../../store/hooks';
import {
	createUser,
	selectAll,
} from '../../../../store/modules/User/usersSlice';
import { emailRegex } from '../../../../utils/validators/regexDados';
import { ValidInfos } from '../../types/ValidInfos';

interface OpenModalProps {
	aberto: boolean;
	changeState: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenModal: React.FC<OpenModalProps> = ({ aberto, changeState }) => {
	const [emailRegister, setEmailRegister] = useState<string>('');
	const [passwordRegister, setPasswordRegister] = useState<string>('');
	const [error, setError] = useState(false);
	const [message, setMessage] = useState<string>('');

	const [errorEmail, setErrorEmail] = useState<ValidInfos>({
		helperText: '',
		isValid: true,
	});
	const [errorPassword, setErrorPassword] = useState<ValidInfos>({
		helperText: '',
		isValid: true,
	});

	const dispatch = useDispatch();
	const users = useAppSelector(selectAll);

	useEffect(() => {
		if (emailRegister.length && !emailRegex.test(emailRegister)) {
			setErrorEmail({
				helperText: 'Informe um e-mail válido.',
				isValid: false,
			});
		} else {
			setErrorEmail({
				helperText: 'Utilize seu e-mail para criar uma conta.',
				isValid: true,
			});
		}
	}, [emailRegister]);

	useEffect(() => {
		if (passwordRegister.length && passwordRegister.length < 6) {
			setErrorPassword({
				helperText: 'Cadastre uma senha com no mínimo 6 caracteres.',
				isValid: false,
			});
		} else {
			setErrorPassword({
				helperText:
					'Utilize uma senha fácil de lembrar e anote para não esquecer.',
				isValid: true,
			});
		}
	}, [passwordRegister]);

	const handleCloseSnack = (
		event: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setError(false);
	};

	const handleClose = () => {
		changeState(false);
	};

	return (
		<Dialog
			open={aberto}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{'Crie sua conta'}
				<IconButton
					aria-label="close"
					onClick={handleClose}
					sx={{
						position: 'absolute',
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<Close />
				</IconButton>
			</DialogTitle>
			<Divider />
			<Box
				component={'form'}
				sx={{ maxWidth: '100%' }}
				onSubmit={(ev) => {
					ev.preventDefault();
					const userFound = users.some(
						(user) => user.email === emailRegister,
					);

					if (userFound) {
						setError(true);
						setMessage(
							'Usuário já cadastrado. Utilize outro e-mail.',
						);
						return;
					}

					dispatch(
						createUser({
							email: emailRegister,
							password: passwordRegister,
						}),
					);

					setEmailRegister('');
					setPasswordRegister('');

					handleClose();
				}}
			>
				<DialogContent>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								label="E-mail"
								type="email"
								fullWidth
								required
								error={!errorEmail.isValid}
								helperText={errorEmail.helperText}
								onChange={(event) => {
									setEmailRegister(event.currentTarget.value);
								}}
								value={emailRegister}
							></TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Senha"
								type="password"
								fullWidth
								required
								inputProps={{ minLenght: 6 }}
								error={!errorPassword.isValid}
								helperText={errorPassword.helperText}
								onChange={(event) => {
									setPasswordRegister(
										event.currentTarget.value,
									);
								}}
								value={passwordRegister}
							></TextField>
						</Grid>
					</Grid>
				</DialogContent>
				<Divider />
				<DialogActions sx={{ paddingY: '20px' }}>
					<Button
						type="button"
						variant="outlined"
						onClick={handleClose}
					>
						Cancelar
					</Button>
					<Button type="submit" variant="contained" autoFocus>
						Confirmar
					</Button>
				</DialogActions>
			</Box>
			<SnackBarComp
				isOpen={error}
				message={message}
				handleClose={handleCloseSnack}
			/>
		</Dialog>
	);
};

export default OpenModal;
