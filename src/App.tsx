import React, { useState, useEffect } from 'react';

import { ColorList } from './components/ColorList/ColorList';
import { ColorAddForm } from './components/ColorAddForm/ColorAddForm';


interface Color {
    name: string;
    hex: string;
    userAdded: boolean;
    isRemovable: boolean;
}

const App: React.FC = () => {
    const [colors, setColors] = useState<Color[]>([]);

    useEffect(() => {
        const storedColors = localStorage.getItem('colors');
        if (storedColors) {
            setColors(JSON.parse(storedColors));
        } else {
            setColors([
                { name: 'Red', hex: '#FF0000', userAdded: false, isRemovable: false },
                { name: 'Green', hex: '#00FF00', userAdded: false, isRemovable: false },
                { name: 'Blue', hex: '#0000FF', userAdded: false, isRemovable: false },
            ]);
        }
    }, []);


    const handleAddColor = (hex: string) => {
        const name = hex.toUpperCase();
        const newColor = { name, hex, userAdded: true, isRemovable: true };
        setColors([...colors, newColor]);
        localStorage.setItem('colors', JSON.stringify([...colors, newColor]));
    };


    const handleRemoveColor = (hex: string) => {
        const newColors = colors.filter((color) => color.hex !== hex);
        setColors(newColors);
        localStorage.setItem('colors', JSON.stringify(newColors));
    };

    return (
        <>
            <ColorAddForm onAddColor={handleAddColor} />
            <ColorList
                defaultColors={colors}
                onRemove={handleRemoveColor} />

        </>
    );
};

export { App };