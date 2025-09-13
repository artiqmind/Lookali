import React from 'react';
import * as UntitledUIIcon from '@untitledui/icons';
import { HelpCircle } from '@untitledui/icons';

// Definir a tipagem das props
interface IconProps {
    name: keyof typeof UntitledUIIcon;  // 'name' deve ser uma chave de UntitledUIIcon
    size?: number;
    color?: string;
    className?: string;
    strokeWidth?: number;
    // Usamos um índice para qualquer outra prop, mas restringimos ao tipo de props do SVG
    [key: string]: any; // Isso será tratado para evitar conflitos
}

const Icon: React.FC<IconProps> = ({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}) => {
    // Pegamos o componente do ícone correspondente ao 'name'
    const IconComponent = UntitledUIIcon[name];

    // Se não encontrarmos o ícone, usamos o HelpCircle como fallback
    if (!IconComponent) {
        return (
            <HelpCircle
                size={size}
                color="gray"
                strokeWidth={strokeWidth}
                className={className}
                {...props}
            />
        );
    }

    // Aqui, passamos as props corretas para o ícone
    return (
        <IconComponent
            size={size}
            color={color}
            strokeWidth={strokeWidth}
            className={className}
            {...props} // Passamos qualquer prop extra
        />
    );
};

export default Icon;
