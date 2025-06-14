'use client';
import { GripHorizontal } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SCENE_TYPES } from './constants';

export function SortableSceneCard({ id, scene, onTextChange, onTypeChange, onVisualChange, onSymbolChange }) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="w-40 border-1 border-gray-200 rounded bg-white flex flex-col"
        >
            <div className="flex flex-row">
                <select
                value={scene.type}
                onChange={(e) => onTypeChange(e.target.value)}
                className="text-xs cursor-pointer px-1 focus:outline-none underline w-full appearance-none"
                >
                {SCENE_TYPES.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
                </select>
                <div {...attributes} {...listeners} className="px-1 h-4 cursor-grab"><GripHorizontal size={16} /></div>
            </div>

            <textarea
                value={scene.text}
                onChange={(e) => onTextChange(e.target.value)}
                rows={8}
                placeholder="Description"
                className="text-xs p-1 resize-none rounded focus:outline-none"
            />

            <textarea
                value={scene.visuals}
                onChange={(e) => onVisualChange(e.target.value)}
                rows={2}
                placeholder='Visuals'
                className="text-xs p-1 resize-none rounded focus:outline-none border-t"
            />
            <textarea
                value={scene.symbols}
                onChange={(e) => onSymbolChange(e.target.value)}
                rows={2}
                placeholder='Symbols'
                className="text-xs p-1 resize-none rounded focus:outline-none border-t"
            />
        </div>
    );
}
