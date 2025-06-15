export function FormTable({ items, formData, onChange }) {
    return (
        <div className="flex justify-center">
            <table className="w-full max-w-6xl">
            <tbody>
                {items.map(({ label, name }) => (
                    <tr key={name} className="border-b  align-top">
                        <td className="w-40 pt-2 pr-2 border-r font-medium align-top">
                            <label htmlFor={name} className="underline">{label}</label>
                        </td>
                        <td className="pr-2">
                            <textarea
                                id={name}
                                name={name}
                                rows={1}
                                className="p-2 text-sm w-full min-h-8 h-8 resize-y focus:outline-none"
                                value={formData[name]}
                                onChange={onChange}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
            </table>
        </div>
    );
}