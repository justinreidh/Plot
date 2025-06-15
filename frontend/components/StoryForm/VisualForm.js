'use client'
import { useState } from 'react'
import { VISUAL_FIELDS } from './fields'
import { FormTable } from './FormTable'

export function VisualForm({formData,setFormData}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form >
            <FormTable items={VISUAL_FIELDS} formData={formData} onChange={handleChange} />
        </form>
    );
}