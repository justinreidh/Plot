'use client'
import { useState } from 'react'
import { CHARACTER_FIELDS } from './fields'
import { FormTable } from './FormTable'

export function CharacterForm({formData,setFormData}) {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <form className="max-w-6xl">
            <FormTable items={CHARACTER_FIELDS} formData={formData} onChange={handleChange} />
        </form>
    );
}