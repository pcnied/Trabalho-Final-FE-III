import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SnackBarComp } from '../../../../components/SnackBar';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectById } from '../../../../store/modules/User/usersSlice';
import {
	emailValidator,
	senhaValidator,
} from '../../../../utils/validators/Inputs';
import ModalOpen from '../ModalCadastro';

interface UserProps {
	id: string;
	email: string;
	senha: string;
}

const FormLogin = () => {
	const [email, setEmail] = useState<string>('');
	const [senha, setSenha] = useState<string>('');
	// const [isLogged, setIsLogged] = useState<boolean>(false);

	const [isError, setIsError] = useState<boolean>(false);
	const [message, setMessage] = useState<string>('');
	const [abertoModal, setAbertoModal] = useState<boolean>(false);

	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const user = useAppSelector((estado) => selectById(estado, email));

	const verifySnack = (emailIsValid: boolean, senhaIsValid: boolean) => {
		if (emailIsValid === false) {
			setMessage('Erro! Verifique seus dados.');
			setIsError(!emailIsValid);
			return;
		}

		if (senhaIsValid === false) {
			setMessage('Erro! Verifique seus dados.');
			setIsError(!senhaIsValid);
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
		const emailIsValid = emailValidator(email);
		const senhaIsValid = senhaValidator(senha);

		verifySnack(emailIsValid, senhaIsValid);

		if (user?.senha === senha) {
			navigate('/home');
			sessionStorage.setItem('userLogged', JSON.stringify(user.email));
		} else {
			verifySnack(false, false);
		}
	};

	const handleClickOpen = () => {
		setAbertoModal(true);
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
								setSenha(event.currentTarget.value);
							}}
							value={senha}
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
			{/* todo alerta, modal, dialog, botão flutuante - position fixed */}
			<SnackBarComp
				message={message}
				isOpen={isError}
				handleClose={handleCloseSnack}
			/>
			<ModalOpen aberto={abertoModal} mudancaEstado={setAbertoModal} />
		</>
	);
};

export default FormLogin;
