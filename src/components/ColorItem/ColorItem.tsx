import React from 'react';
import "./ColorItem.scss"

interface Color {
    name: string;
    hex: string;
    userAdded?: boolean;

}

interface ColorItemProps {
    color: Color;
    isRemovable?: boolean;
    onRemove: (color: Color) => void;

}

const ColorItem: React.FC<ColorItemProps> = ({ color, isRemovable, onRemove }) => {
    const handleRemove = () => {
        onRemove(color);
    };

    return (
        <div className="color-item" style={{ backgroundColor: color.hex }}>
            <span>{color.name}</span>
            {isRemovable && color?.userAdded && <button onClick={handleRemove}>x</button>}

        </div>
    );
};


export { ColorItem };
