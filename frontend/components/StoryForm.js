'use client'
import { useState } from 'react'

export function StoryForm() {
    const [formData, setFormData] = useState({
        premise: '',
        designingPrinciple: '',
        hero: '',
        conflict: '',
        change: '',
        weakness: '',
        action: '',
        moralChoice: '',
        centralMoralProblem: '',
        heroWeaknessNeed: '',
        psychNeed: '',
        moralNeed: '',
        problem: '',
        desire: '',
        opponent: '',
        plan: '',
        battle: '',
        revelation: '',
        newEquilibrium: '',
        values: '',
        moralProblemVariation: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    const items = [
                    { label: 'Premise', name: 'premise' },
                    { label: 'Designing Principle', name: 'designingPrinciple' },
                    { label: 'Hero', name: 'hero' },
                    { label: 'Conflict', name: 'conflict' },
                    { label: 'Change', name: 'change' },
                    { label: 'Weakness', name: 'weakness' },
                    { label: 'Action', name: 'action' },
                    { label: 'Moral Choice', name: 'moralChoice' },
                    { label: 'Central Moral Problem', name: 'centralMoralProblem' },
                    { label: 'Hero Weakness and Need', name: 'heroWeaknessNeed' },
                    { label: 'Psychological Need', name: 'psychNeed' },
                    { label: 'Moral Need', name: 'moralNeed' },
                    { label: 'Problem', name: 'problem' },
                    { label: 'Desire', name: 'desire' },
                    { label: 'Opponent', name: 'opponent' },
                    { label: 'Plan', name: 'plan' },
                    { label: 'Battle', name: 'battle' },
                    { label: 'Psych & Moral Revelation', name: 'revelation' },
                    { label: 'New Equilibrium', name: 'newEquilibrium' },
                    { label: 'Values', name: 'values' },
                    { label: 'Variation on Moral Problem', name: 'moralProblemVariation' }
                ]

    return (
    <form onSubmit={handleSubmit} className="max-w-6xl space-y-4">
        <table className="w-full">
            <tbody>
                {items.map(({ label, name }) => (
                    <tr key={name} className="border-t align-top">
                        <td className="w-40 pt-2 border-r font-medium align-top">
                            <label htmlFor={name} className="underline">
                                {label}
                            </label>
                        </td>
                        <td >
                            <textarea
                                id={name}
                                name={name}
                                rows={2}
                                className="p-2 w-full resize-y focus:outline-none"
                                value={formData[name]}
                                onChange={handleChange}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <div className="mt-4">
            <button type="submit" className="p-2 rounded hover:bg-gray-200 cursor-pointer">
                Save Story
            </button>
        </div>
    </form>
);

}
