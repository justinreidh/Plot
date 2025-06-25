import { useEffect, useRef, useState } from 'react';

export function FormTable({ items, formData, onChange }) {
    const textareaRefs = useRef({});
    const [openTooltip, setOpenTooltip] = useState(null); // Track open tooltip


    useEffect(() => {
        items.forEach(({ name }) => {
            const curr_row = textareaRefs.current[name];
            if (curr_row) {
                curr_row.style.height = 'auto';
                curr_row.style.height = `${curr_row.scrollHeight}px`;
            }
        });
    }, [items, formData]); 

    const toggleTooltip = (name) => {
        setOpenTooltip((prev) => (prev === name ? null : name));
    };

    return (
        <div className="flex justify-center">
            <table className="w-full max-w-6xl">
            <tbody>
                {items.map(({ label, name, tooltip }) => (
                    <tr key={name} className="border-b  align-top">
                        <td className="w-40 pt-2 pr-2 border-r font-medium align-top relative">
                            <div className="flex items-start space-x-1">
                                <label htmlFor={name} className="underline">{label}</label>
                                {tooltip && (
                                    <button
                                        type="button"
                                        onClick={() => toggleTooltip(name)}
                                        className="text-xs bg-gray-100 rounded-full w-5 h-5 text-center cursor-pointer hover:bg-gray-300 flex items-center justify-center"
                                        title="Click for more info"
                                    >
                                        ?
                                    </button>
                                )}
                            </div>
                            {tooltip && openTooltip === name && (
                                <div className="absolute top-8 left-0 z-20 bg-white text-gray-700 text-sm p-2 rounded-md shadow-lg w-64 border border-gray-300">
                                    {tooltip}
                                </div>
                            )}
                        </td>

                        <td className="pr-2">
                            <textarea
                                id={name}
                                name={name}
                                rows={1}
                                ref={(curr_row) => textareaRefs.current[name] = curr_row}
                                className="p-2 text-sm w-full min-h-9 resize-none focus:outline-none"
                                value={formData[name]}
                                onChange={onChange}
                                onInput={(e) => {
                                    e.target.style.height = "auto";
                                    e.target.style.height = `${e.target.scrollHeight}px`; 
                                }}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}