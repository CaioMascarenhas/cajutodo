import React, { useEffect, useState } from 'react';
import AddEvent from './AddEvent/AddEvent';
import Card from './Cards/card';
import { supabase } from '@/lib/supabaseClient';
import { Typography } from '@mui/material';

interface Evento {
    id: number;
    titulos: string;
    descricao: string;
    imagem: string;
    concluido: boolean;
    created_at: string;
}

const Filmes = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchEventos = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('eventos')
                .select('*')
                .eq('categoria', 'filmes')
                .order('created_at', { ascending: false });
            if (!error && data) setEventos(data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };
        fetchEventos();
    }, []);

    if (loading) {
        return <>
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mr-6"></div>
                <Typography>Carregando eventos maravilhosos...</Typography>
            </div>
        </>
    }

    return (
        <>
            <div className="flex flex-wrap gap-6 justify-center mb-16">
                {eventos.map((evento: any) => (
                    <Card
                        key={evento.id}
                        image={evento.imagem}
                        title={evento.titulos}
                        description={evento.descricao}
                        checked={evento.concluido}
                        id={evento.id}
                    />
                ))}
            </div>
            <AddEvent category="filmes" />
        </>
    );
};

export default Filmes;