import { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { supabase } from '@/lib/supabaseClient';
import { useAlert } from '@/app/contexts/alertContext';

interface DeleteEventProps {
	evento: {
		id: number;
		titulos: string;
	};
    triggerReload?: () => void;
	onDeleted?: () => void;
}

export default function DeleteEvent({ evento, onDeleted, triggerReload }: DeleteEventProps) {
	const [open, setOpen] = useState(false);
	const { showAlert } = useAlert();

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleDelete = async () => {
		const { error } = await supabase.from('eventos').delete().eq('id', evento.id);
		if (error) {
			showAlert('Erro ao deletar evento', 'error');
		} else {
			showAlert('Evento deletado com sucesso', 'success');
			if (onDeleted) onDeleted();
			if (triggerReload) triggerReload();
		}
		setOpen(false);
	};

	return (
		<>
			<IconButton
				onClick={handleOpen}
				aria-label="Deletar evento"
				size="medium"
				sx={{
					bgcolor: 'white',
					boxShadow: '0 2px 10px rgba(59,130,246,0.12)',
					'&:hover': { bgcolor: 'white' },
					zIndex: 9999,
					color: 'error.main'
				}}
			>
				<DeleteIcon />
			</IconButton>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Deletar Evento</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Tem certeza que quer deletar o evento <b>{evento.titulos}</b>?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">Cancelar</Button>
					<Button onClick={handleDelete} color="error" variant="contained">Deletar</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
