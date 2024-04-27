import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SnackBarComp } from '../../../../components/SnackBar';
import { useAppSelector } from '../../../../store/hooks';
import { selectAll } from '../../../../store/modules/User/usersSlice';
import {
	emailValidator,
	passwordValidator,
} from '../../../../utils/validators/Inputs';
import OpenModal from '../ModalRegister';

const FormLogin = () => {
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [openModal, setOpenModal] = useState<boolean>(false);

	const navigate = useNavigate();

	const users = useAppSelector(selectAll);

	const verifySnack = (isValidEmail: boolean, isValidPassword: boolean) => {
		if (isValidEmail === false) {
			setMessage('Erro! Verifique seus dados.');
			setIsError(!isValidEmail);
			return;
		}

		if (isValidPassword === false) {
			setMessage('Erro! Verifique seus dados.');
			setIsError(!isValidPassword);
			return;
		}
	};

	const handleCloseSnack = (
		event: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === 'clickaway') {
			return;
		}

		setIsError(false);
	};

	const save = () => {
		const isValidEmail = emailValidator(email);
		const isValidPassword = passwordValidator(password);

		verifySnack(isValidEmail, isValidPassword);
		const userFound = users.find((user) => {
			return user.email === email;
		});

		if (!userFound) {
			verifySnack(false, false);
			return;
		}

		if (userFound.password === password) {
			navigate('/home');
			sessionStorage.setItem(
				'userLogged',
				JSON.stringify(userFound.email),
			);
		} else {
			verifySnack(false, false);
		}
	};

	const handleClickOpen = () => {
		setOpenModal(true);
	};

	return (
		<>
			<Box
				component={'form'}
				sx={{ maxWidth: '75%' }}
				onSubmit={(event) => {
					event.preventDefault();
					save();
				}}
			>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="E-mail"
							fullWidth
							onChange={(event) => {
								setEmail(event.currentTarget.value);
							}}
							value={email}
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Senha"
							fullWidth
							onChange={(event) => {
								setPassword(event.currentTarget.value);
							}}
							value={password}
							type="password"
						></TextField>
					</Grid>
					<Grid item xs={12}>
						<Button
							variant="contained"
							fullWidth
							type="submit"
							sx={{
								display: 'block',
								margin: '0 auto',
								width: '130px',
							}}
						>
							Entrar
						</Button>
					</Grid>
					<Grid item xs={12} textAlign={'center'}>
						<Typography variant="caption" fontSize={'20px'}>
							Ainda não tem conta?{' '}
							<Link
								component={'button'}
								type="button"
								sx={{ textDecoration: 'none' }}
								onClick={handleClickOpen}
							>
								Criar Conta.
							</Link>
						</Typography>
					</Grid>
				</Grid>
			</Box>
			<SnackBarComp
				message={message}
				isOpen={isError}
				handleClose={handleCloseSnack}
			/>
			<OpenModal aberto={openModal} changeState={setOpenModal} />
		</>
	);
};

export default FormLogin;
