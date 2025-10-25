import React, { useEffect, useState } from 'react';
import AddEvent from './AddEvent/AddEvent';
import Card from './Cards/card';
import { supabase } from '@/lib/supabaseClient';
import { Typography } from '@mui/material';

const Series = () => {
    const [eventos, setEventos] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showConcluidos, setShowConcluidos] = useState(false);
    const [reload, setReload] = useState(false);

    function triggerReload() {
        setReload(!reload);
    }


    useEffect(() => {
        const fetchEventos = async () => {
            setLoading(true);
            let query = supabase
                .from('eventos')
                .select('*')
                .eq('categoria', 'series')
                .order('created_at', { ascending: false });
            if (showConcluidos !== undefined) {
                query = query.eq('concluido', showConcluidos);
            }
            const { data, error } = await query;
            if (!error && data) setEventos(data);
            setTimeout(() => {
                setLoading(false);
            }, 500);
        };
        fetchEventos();
    }, [showConcluidos]);

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
            <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-3 bg-white rounded-full shadow px-6 py-3" style={{ boxShadow: '0 2px 8px 0 rgba(59,130,246,0.10)' }}>
                    <span className="text-gray-700 font-medium">Mostrar concluídos</span>
                    <button
                        onClick={() => setShowConcluidos((v) => !v)}
                        className={`relative w-12 h-7 flex items-center rounded-full transition-colors duration-300 focus:outline-none ${showConcluidos ? 'bg-green-400' : 'bg-gray-300'}`}
                        aria-label="Alternar visualização de concluídos"
                    >
                        <span
                            className={`absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-300 ${showConcluidos ? 'translate-x-5' : ''}`}
                        />
                    </button>
                </div>
            </div>
            <div className="flex flex-wrap gap-6 justify-center mb-16">
                {eventos.map((evento: any) => (
                    <Card
                        key={evento.id}
                        id={evento.id}
                        image={evento.imagem}
                        title={evento.titulos}
                        description={evento.descricao}
                        checked={evento.concluido}
                        triggerReload={triggerReload}
                    />
                ))}
            </div>
            <AddEvent category="series" triggerReload={triggerReload} />
        </>
    );
};

export default Series;