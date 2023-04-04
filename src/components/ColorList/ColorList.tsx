import React, { useState, useEffect } from 'react';

import { ColorItem } from '../ColorItem/ColorItem';
import { ColorFilterForm } from '../ColorFilterForm/ColorFilterForm';
import "./ColorList.scss"

interface Color {
    name: string;
    hex: string;

}
interface ColorListProps {
    defaultColors: Color[];
    onRemove: (hex: string) => void;
}

const ColorList: React.FC<ColorListProps> = ({ defaultColors, onRemove }) => {
    const [colors, setColors] = useState<Color[]>([]);
    const [filters, setFilters] = useState({
        red: false,
        green: false,
        blue: false,
        saturation: false,
    });

    useEffect(() => {
        const storedColors = localStorage.getItem('colors');
        if (storedColors) {
            setColors(JSON.parse(storedColors));
        } else {
            setColors(defaultColors);
        }
    }, [defaultColors]);

    const handleRemove = (color: Color) => {
        const updatedColors = colors.filter((c) => c.hex !== color.hex);
        localStorage.setItem('colors', JSON.stringify(updatedColors));
        setColors(updatedColors);
        onRemove(color.hex);
    };

    const handleFilterChange = (filterName: string, value: boolean) => {
        setFilters((prevFilters) => ({ ...prevFilters, [filterName]: value }));
    };
    const renderedColors = colors
        .filter((color) => {
            if (filters.red && color.hex.substring(1, 3) <= '7F') {
                return false;
            }
            if (filters.green && color.hex.substring(3, 5) <= '7F') {
                return false;
            }
            if (filters.blue && color.hex.substring(5, 7) <= '7F') {
                return false;
            }
            const rgb = {
                r: parseInt(color.hex.substring(1, 3), 16),
                g: parseInt(color.hex.substring(3, 5), 16),
                b: parseInt(color.hex.substring(5, 7), 16),
            };
            const max = Math.max(rgb.r, rgb.g, rgb.b);
            const min = Math.min(rgb.r, rgb.g, rgb.b);
            const l = (max + min) / 510;
            if (filters.saturation && (max === 0 || (max - min) / 255 / (1 - l) <= 0.5)) {
                return false;
            }
            const s = max === min ? 0 : (max - min) / (max + min);
            if (filters.saturation && s <= 0.5) {
                return false;
            }
            return true;
        })
        .sort((a, b) => {
            const rgbA = {
                r: parseInt(a.hex.substring(1, 3), 16),
                g: parseInt(a.hex.substring(3, 5), 16),
                b: parseInt(a.hex.substring(5, 7), 16),
            };
            const rgbB = {
                r: parseInt(b.hex.substring(1, 3), 16),
                g: parseInt(b.hex.substring(3, 5), 16),
                b: parseInt(b.hex.substring(5, 7), 16),
            };
            if (rgbA.r !== rgbB.r) {
                return rgbB.r - rgbA.r;
            }
            if (rgbA.g !== rgbB.g) {
                return rgbB.g - rgbA.g;
            }
            if (rgbA.b !== rgbB.b) {
                return rgbB.b - rgbA.b;
            }
            return 0;
        })
        .map((color) => <ColorItem
            key={color.hex}
            color={color}
            onRemove={handleRemove}
            isRemovable={true}
        />);

    return (
        <div className="Color">
            <h2>Kolory</h2>
        <div className="color-list">
                {renderedColors}

        </div>
            <ColorFilterForm filters={filters} onChange={handleFilterChange}/>
        </div>
    );
};

export { ColorList };
