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
	adicionarUsuario,
	selectAll,
} from '../../../../store/modules/User/usersSlice';
import { emailRegex } from '../../../../utils/validators/regexDados';
import { InfosValidas } from '../../types/InfosValidas';

interface ModalOpenProps {
	aberto: boolean;
	mudancaEstado: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalOpen: React.FC<ModalOpenProps> = ({ aberto, mudancaEstado }) => {
	const [emailCadastro, setEmailCadastro] = useState<string>('');
	const [senhaCadastro, setSenhaCadastro] = useState<string>('');
	const [error, setError] = useState(false);
	const [message, setMessage] = useState<string>('');

	const [errorEmail, setErrorEmail] = useState<InfosValidas>({
		helperText: '',
		isValid: true,
	});
	const [errorSenha, setErrorSenha] = useState<InfosValidas>({
		helperText: '',
		isValid: true,
	});

	const dispatch = useDispatch();
	const users = useAppSelector(selectAll);

	useEffect(() => {
		if (emailCadastro.length && !emailRegex.test(emailCadastro)) {
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
	}, [emailCadastro]);

	useEffect(() => {
		if (senhaCadastro.length && senhaCadastro.length < 6) {
			setErrorSenha({
				helperText: 'Cadastre uma senha com no mínimo 6 caracteres.',
				isValid: false,
			});
		} else {
			setErrorSenha({
				helperText:
					'Utilize uma senha fácil de lembrar e anote para não esquecer.',
				isValid: true,
			});
		}
	}, [senhaCadastro]);

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
		mudancaEstado(false);
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
					const usuarioExistente = users.some(
						(usuario) => usuario.email === emailCadastro,
					);

					if (usuarioExistente) {
						setError(true);
						setMessage(
							'Usuário já cadastrado. Utilize outro e-mail.',
						);
						return;
					}

					dispatch(
						adicionarUsuario({
							email: emailCadastro,
							senha: senhaCadastro,
						}),
					);

					setEmailCadastro('');
					setSenhaCadastro('');

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
									setEmailCadastro(event.currentTarget.value);
								}}
								value={emailCadastro}
							></TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								label="Senha"
								type="password"
								fullWidth
								required
								inputProps={{ minLenght: 6 }}
								error={!errorSenha.isValid}
								helperText={errorSenha.helperText}
								onChange={(event) => {
									setSenhaCadastro(event.currentTarget.value);
								}}
								value={senhaCadastro}
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

export default ModalOpen;
