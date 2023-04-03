import React, { useState } from "react";

import "./ColorAddForm.scss";

interface ColorAddFormProps {
    onAddColor: (color: string) => void;
}

const ColorAddForm: React.FC<ColorAddFormProps> = ({ onAddColor }) => {
    const [colorInput, setColorInput] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();



        if (/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(colorInput)) {
            onAddColor(colorInput.toUpperCase());
            setColorInput("");
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.value.length === 1 && event.target.value === "#") {
            setColorInput(event.target.value.toUpperCase());
            return;
        } else if (event.target.value.length === 7 && !/^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(event.target.value)) {

            return;
        }

        setColorInput(event.target.value.toUpperCase());
    };

    return (
        <form className="color-add-form" onSubmit={handleSubmit}>
            <label htmlFor="color-add-form-input">Zastosuj wartość koloru HEX RGB:</label>
            <input id="color-input" type="text" maxLength={7} value={colorInput} onChange={handleChange} />
            <button className="color-add-form-button" type="submit">Dodaj</button>
        </form>
    );
};

export {ColorAddForm};
