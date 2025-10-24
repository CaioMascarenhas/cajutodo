import { useState } from "react";
import { Fab, Dialog, DialogContentText, DialogTitle, DialogActions, DialogContent, Button, TextField } from "@mui/material";
import { supabase } from "@/lib/supabaseClient";
import { Add } from "@mui/icons-material";

interface Category {
    category: string;
}

export default function AddEvent({ category }: Category) {

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [imagemFile, setImagemFile] = useState<File | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        let imageUrl = "";
        if (imagemFile) {
            const fileExt = imagemFile.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
            const { data, error } = await supabase.storage
                .from('imagens-eventos')
                .upload(fileName, imagemFile);
            if (!error && data) {
                imageUrl = `${supabase.storage.from('imagens-eventos').getPublicUrl(fileName).data.publicUrl}`;
            }
        }
        await supabase.from("eventos").insert({
            titulos: titulo,
            descricao,
            imagem: imageUrl,
            concluido: false,
            categoria: category,
        });
        setOpen(false);
        setTitulo("");
        setDescricao("");
        setImagemFile(null);
    };

    return (
        <>
            <Fab color="primary" onClick={handleClickOpen} sx={{ position: 'absolute', right: 16, bottom: 16 }}>
                <Add />
            </Fab>
            <Dialog open={open} onClose={handleClose}>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2 pb-2">
                    <DialogTitle className="text-center font-bold text-lg">Adicionar Evento</DialogTitle>
                    <DialogContent>
                        <DialogContentText className="mb-2 text-gray-600 text-sm text-center">
                            Preencha os dados do nosso grande evento da categoria {category}!
                        </DialogContentText>
                        <div className="flex flex-col gap-3">
                            <TextField
                                autoFocus
                                margin="dense"
                                label="Título"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={titulo}
                                onChange={e => setTitulo(e.target.value)}
                                InputProps={{ className: 'text-base' }}
                            />
                            <TextField
                                margin="dense"
                                label="Descrição"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={descricao}
                                onChange={e => setDescricao(e.target.value)}
                                InputProps={{ className: 'text-base' }}
                            />
                            <div className="flex flex-col items-center gap-2 mt-2">
                                <label htmlFor="imagem-upload" className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded shadow transition-all duration-150">
                                    {imagemFile ? 'Imagem selecionada' : 'Escolher imagem'}
                                    <input
                                        id="imagem-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={e => {
                                            if (e.target.files && e.target.files[0]) {
                                                setImagemFile(e.target.files[0]);
                                            }
                                        }}
                                        className="hidden"
                                    />
                                </label>
                                {imagemFile && (
                                    <span className="text-xs text-gray-500">{imagemFile.name}</span>
                                )}
                            </div>
                        </div>
                    </DialogContent>
                    <DialogActions className="flex justify-center gap-4 pb-2">
                        <Button onClick={handleClose} className="bg-gray-200 text-gray-700 rounded px-4 py-2">Cancelar</Button>
                        <Button type="submit" className="bg-blue-600 text-white rounded px-4 py-2">Adicionar</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

