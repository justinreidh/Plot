'use client'
import { useState } from 'react'
import { VISUAL_FIELDS } from './fields'
import { FormTable } from './FormTable'

export function VisualForm() {
    const [formData, setFormData] = useState(
        Object.fromEntries(VISUAL_FIELDS.map(field => [field.name, '']))
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-6xl">
            <FormTable items={VISUAL_FIELDS} formData={formData} onChange={handleChange} />
        </form>
    );
}