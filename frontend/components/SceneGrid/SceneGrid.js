'use client';
import { useState } from 'react';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { ACT_LABELS } from './constants';
import { SortableSceneCard } from './SortableSceneCard';

const TOTAL_ROWS = 4;

export function SceneGrid({scenes, setScenes}) {
    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
    );

    const handleTextChange = (rowIdx, cardIdx, value) => {
        const updated = [...scenes];
        updated[rowIdx].scenes[cardIdx].text = value;
        setScenes(updated);
    };

    const handleTypeChange = (rowIdx, cardIdx, newType) => {
        const updated = [...scenes];
        updated[rowIdx].scenes[cardIdx].type = newType;
        setScenes(updated);
    };
    const handleVisualChange = (rowIdx, cardIdx, value) => {
        const updated = [...scenes];
        updated[rowIdx].scenes[cardIdx].visuals = value;
        setScenes(updated);
    };
    const handleSymbolChange = (rowIdx, cardIdx, value) => {
        const updated = [...scenes];
        updated[rowIdx].scenes[cardIdx].symbols = value;
        setScenes(updated);
    };

    const handleAddScene = (rowIdx) => {
        const updated = [...scenes];
        updated[rowIdx].scenes.push({ id: crypto.randomUUID(), type: 'None', text: '', visuals: '', symbols: '' });
        setScenes(updated);
    };

    const handleDragEnd = (event, rowIndex) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;

        const oldIndex = scenes[rowIndex].findIndex(scene => scene.id === active.id);
        const newIndex = scenes[rowIndex].findIndex(scene => scene.id === over.id);
        const updatedRow = arrayMove(scenes[rowIndex], oldIndex, newIndex);

        const updated = [...scenes];
        updated[rowIndex] = updatedRow;
        setScenes(updated);
    };

    return (
        <div className="max-w-[calc(100vw-82px)] space-y-4">
        {scenes.map((row, rowIndex) => (
            <div key={rowIndex} className="w-full">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-semibold">{ACT_LABELS[rowIndex]}</h3>
                    <button
                        onClick={() => handleAddScene(rowIndex)}
                        className="text-sm px-2 py-1 rounded hover:bg-gray-100 cursor-pointer"
                        >
                        + Scene
                    </button>
                </div>

                <div className="w-full p-2 overflow-x-auto border-x-2 border-gray-200 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={(event) => handleDragEnd(event, rowIndex)}
                    >
                        <SortableContext
                            items={row.scenes.map((scene) => scene.id)}
                            strategy={horizontalListSortingStrategy}
                        >
                            <div className="flex gap-2 min-w-max">
                            {row.scenes.map((scene, cardIndex) => (
                                <SortableSceneCard
                                    key={scene.id}
                                    id={scene.id}
                                    scene={scene}
                                    onTextChange={(val) => handleTextChange(rowIndex, cardIndex, val)}
                                    onTypeChange={(val) => handleTypeChange(rowIndex, cardIndex, val)}
                                    onVisualChange={(val) => handleVisualChange(rowIndex, cardIndex, val)}
                                    onSymbolChange={(val) => handleSymbolChange(rowIndex, cardIndex, val)}
                                />
                            ))}
                            </div>
                        </SortableContext>
                    </DndContext>
                </div>
            </div>
        ))}
        </div>
    );
}
