import React, { useState } from "react";
import { supabase } from '@/lib/supabaseClient';
import DeleteEvent from '../AddEvent/deleteEvent';

interface CardProps {
    image: string;
    title: string;
    description: string;
    checked?: boolean;
    onCheck?: (checked: boolean) => void;
    id?: number;
    triggerReload?: () => void;
}

const Card: React.FC<CardProps> = ({ image, title, description, checked = false, onCheck, id, triggerReload }) => {
    const [isChecked, setIsChecked] = useState(checked);

    const handleCheck = async () => {
        const newChecked = !isChecked;
        setIsChecked(newChecked);
        if (onCheck) onCheck(newChecked);
        if (id) {
            await supabase
                .from('eventos')
                .update({ concluido: newChecked, concluido_em: newChecked ? new Date().toISOString().slice(0, 10) : null })
                .eq('id', id);
        }
        triggerReload && triggerReload();
    };

    return (
        <div className="relative max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl w-full rounded-lg overflow-visible shadow-lg bg-white flex flex-col items-center p-4">
            <img className="w-full h-40 sm:h-48 md:h-56 lg:h-64 xl:h-72 object-cover rounded-md mb-4" src={image} alt={title} />
            <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">{title}</h2>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheck}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">Aventura Concluída</span>
                    </label>
                </div>
                <p className="text-gray-600 text-base md:text-lg lg:text-xl">{description}</p>
            </div>
            { id && title && (
                <div className="absolute bottom-4 right-4 z-20">
                    <DeleteEvent evento={{ id, titulos: title }} triggerReload={triggerReload} />
                </div>
            )}
        </div>
    );
};

export default Card;
