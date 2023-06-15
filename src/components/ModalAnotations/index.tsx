import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Grid,
	TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { v4 as generateId } from 'uuid';

import { useAppDispatch } from '../../store/hooks';
import {
	adicionarAnotacao,
	deletarAnotacao,
	editarAnotacao,
} from '../../store/modules/Anotations';
import { hideModal } from '../../store/modules/ModalAnotations';
import Anotations from '../../types/Anotations';

interface ModalAnotationsProps {
	anotation?: Anotations;
	contexto: 'criar' | 'modificar' | 'deletar';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAnotations: React.FC<ModalAnotationsProps> = ({
	anotation,
	contexto,
	open,
	setOpen,
}) => {
	const [titulo, setTitulo] = useState(anotation?.titulo || '');
	const [descricao, setDescricao] = useState(anotation?.descricao || '');
	const [data, setData] = useState(anotation?.criadoEm || '');
	const dispatch = useAppDispatch();
	const criarAnotacao = () => {
		dispatch(hideModal());
		switch (contexto) {
			case 'criar':
				dispatch(
					adicionarAnotacao({
						criadoEm: data,
						criadoPor: JSON.parse(
							sessionStorage.getItem('userLogged') || '',
						),
						descricao: descricao,
						id: generateId(),
						titulo: titulo,
					}),
				);
				break;

			case 'modificar':
				if (anotation) {
					dispatch(
						editarAnotacao({
							id: anotation.id,
							changes: {
								titulo: titulo,
								descricao: descricao,
							},
						}),
					);
				}
				break;

			case 'deletar':
				if (anotation) {
					dispatch(deletarAnotacao(anotation.id));
				}
				break;
		}

		setOpen(false);
		setTitulo('');
		setDescricao('');
		setData('');
	};

	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{contexto === 'criar' && 'Criar Anotação'}
				{contexto === 'modificar' && 'Modificar Anotação'}
				{contexto === 'deletar' && 'Deletar Anotação'}
			</DialogTitle>
			<Divider />
			<DialogContent>
				{contexto !== 'deletar' && (
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								onChange={(evento) =>
									setTitulo(evento.target.value)
								}
								value={titulo}
								fullWidth
								label="Título"
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(evento) =>
									setDescricao(evento.target.value)
								}
								value={descricao}
								fullWidth
								label="Descrição"
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(evento) =>
									setData(evento.target.value)
								}
								value={data}
								InputLabelProps={{
									shrink: true,
								}}
								fullWidth
								label="Data"
								type="date"
							/>
						</Grid>
					</Grid>
				)}

				{contexto === 'deletar' && (
					<DialogContentText id="alert-dialog-description">
						Deseja realmente excluir? Essa ação não poderá ser
						modificada.
					</DialogContentText>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={() => setOpen(false)}>
					Cancelar
				</Button>
				<Button
					variant="contained"
					onClick={() => criarAnotacao()}
					autoFocus
				>
					Concluir
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalAnotations;
