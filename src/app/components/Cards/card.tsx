import React, { useState } from "react";
import { supabase } from '@/lib/supabaseClient';

interface CardProps {
    image: string;
    title: string;
    description: string;
    checked?: boolean;
    onCheck?: (checked: boolean) => void;
    id?: number;
}

const Card: React.FC<CardProps> = ({ image, title, description, checked = false, onCheck, id }) => {
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
    };

    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white flex flex-col items-center p-4">
            <img className="w-full h-40 object-cover rounded-md mb-4" src={image} alt={title} />
            <div className="w-full flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                    <label className="flex items-center cursor-pointer">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheck}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">Feito</span>
                    </label>
                </div>
                <p className="text-gray-600 text-base">{description}</p>
            </div>
        </div>
    );
};

export default Card;
