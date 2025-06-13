'use client'
import { useState } from 'react'
import { PLOT_FIELDS } from './fields'
import { FormTable } from './FormTable'

export function PlotForm({formData,setFormData}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className="max-w-6xl">
            <FormTable items={PLOT_FIELDS} formData={formData} onChange={handleChange} />
        </form>
    );
}