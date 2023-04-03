import React from 'react';

import './ColorFilterForm.scss';

interface ColorFilterFormProps {
    filters: {
        red: boolean;
        green: boolean;
        blue: boolean;
        saturation: boolean;
    };
    onChange: (filterName: string, value: boolean) => void;
}

const ColorFilterForm: React.FC<ColorFilterFormProps> = ({ filters, onChange }) => {
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = event.target;
        onChange(name, checked);
    };

    return (
        <form className="color-filter-form">
            <div className="color-filter-form__checkbox-group">
                <label className="color-filter-form__checkbox-label">
                    <input
                        type="checkbox"
                        name="red"
                        checked={filters.red}
                        onChange={handleCheckboxChange}
                    />
                    <span className="color-filter-form__checkbox-custom"></span>
                    Red &gt; 50%
                </label>
                <label className="color-filter-form__checkbox-label">
                    <input
                        type="checkbox"
                        name="green"
                        checked={filters.green}
                        onChange={handleCheckboxChange}
                    />
                    <span className="color-filter-form__checkbox-custom"></span>
                    Green &gt; 50%
                </label>
                <label className="color-filter-form__checkbox-label">
                    <input
                        type="checkbox"
                        name="blue"
                        checked={filters.blue}
                        onChange={handleCheckboxChange}
                    />
                    <span className="color-filter-form__checkbox-custom"></span>
                    Blue &gt; 50%
                </label>
                <label className="color-filter-form__checkbox-label">
                    <input
                        type="checkbox"
                        name="saturation"
                        checked={filters.saturation}
                        onChange={handleCheckboxChange}
                    />
                    <span className="color-filter-form__checkbox-custom"></span>
                    Saturation &gt; 50%
                </label>
            </div>
        </form>
    );
};

export {ColorFilterForm};
