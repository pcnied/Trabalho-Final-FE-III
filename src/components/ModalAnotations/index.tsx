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
import React, { useEffect, useState } from 'react';
import { v4 as generateId } from 'uuid';

import { useAppDispatch } from '../../store/hooks';
import {
	createAnotation,
	deleteAnotation,
	updateAnotation,
} from '../../store/modules/Anotations';
import { hideModal } from '../../store/modules/ModalAnotations';
import Anotations from '../../types/Anotations';

interface ModalAnotationsProps {
	anotation?: Anotations;
	context: 'create' | 'update' | 'delete';
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalAnotations: React.FC<ModalAnotationsProps> = ({
	anotation,
	context,
	open,
	setOpen,
}) => {
	const [title, setTitle] = useState<string>(anotation?.title || '');
	const [description, setDescription] = useState<string>(
		anotation?.description || '',
	);
	const [date, setDate] = useState<string>(anotation?.createdAt || '');
	const [fieldsValid, setFieldsValid] = useState<boolean>(false);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (anotation) {
			setTitle(anotation.title || '');
			setDescription(anotation.description || '');
			setDate(anotation.createdAt || '');
		}
	}, [anotation]);

	const resetState = () => {
		setTitle('');
		setDescription('');
		setDate('');
	};

	const handleClose = () => {
		setOpen(false);
		resetState();
	};

	const handleCreateOrUpdate = () => {
		dispatch(hideModal());

		if (context === 'create') {
			dispatch(
				createAnotation({
					createdAt: date,
					createdBy: JSON.parse(
						sessionStorage.getItem('userLogged') || '',
					),
					description: description,
					id: generateId(),
					title: title,
				}),
			);
		} else if (context === 'update' && anotation) {
			dispatch(
				updateAnotation({
					id: anotation.id,
					changes: {
						title: title,
						description: description,
						createdAt: date,
					},
				}),
			);
		} else if (context === 'delete' && anotation) {
			dispatch(deleteAnotation(anotation.id));
		}

		handleClose();
	};

	const validateFields = () => {
		if (
			title.trim() !== '' &&
			description.trim() !== '' &&
			date.trim() !== ''
		) {
			setFieldsValid(true);
		} else {
			setFieldsValid(false);
		}
	};

	useEffect(() => {
		validateFields();
	}, [title, description, date]);

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
		>
			<DialogTitle id="alert-dialog-title">
				{context === 'create' && 'Criar Anotação'}
				{context === 'update' && 'Modificar Anotação'}
				{context === 'delete' && 'Deletar Anotação'}
			</DialogTitle>
			<Divider />
			<DialogContent>
				{context === 'delete' ? (
					<DialogContentText id="alert-dialog-description">
						Deseja realmente excluir? Essa ação não poderá ser
						modificada.
					</DialogContentText>
				) : (
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								onChange={(event) =>
									setTitle(event.target.value)
								}
								value={title}
								fullWidth
								label="Título"
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(event) =>
									setDescription(event.target.value)
								}
								value={description}
								fullWidth
								label="Descrição"
								type="text"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								onChange={(event) =>
									setDate(event.target.value)
								}
								value={date}
								InputLabelProps={{ shrink: true }}
								fullWidth
								label="Data"
								type="date"
							/>
						</Grid>
					</Grid>
				)}
			</DialogContent>
			<DialogActions>
				<Button variant="outlined" onClick={handleClose}>
					Cancelar
				</Button>
				<Button
					variant="contained"
					onClick={handleCreateOrUpdate}
					autoFocus
					disabled={!fieldsValid}
				>
					Concluir
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default ModalAnotations;
