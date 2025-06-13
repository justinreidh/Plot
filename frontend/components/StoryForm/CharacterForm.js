'use client'
import { useState } from 'react'
import { CHARACTER_FIELDS } from './fields'
import { FormTable } from './FormTable'

export function CharacterForm({formData,setFormData}) {
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
            <FormTable items={CHARACTER_FIELDS} formData={formData} onChange={handleChange} />
        </form>
    );
}