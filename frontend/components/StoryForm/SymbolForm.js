'use client'
import { useState } from 'react'
import { SYMBOL_FIELDS } from './fields'
import { FormTable } from './FormTable'

export function SymbolForm({formData,setFormData}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form >
            <FormTable items={SYMBOL_FIELDS} formData={formData} onChange={handleChange} />
        </form>
    );
}