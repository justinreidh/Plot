'use client'
import { useState } from 'react'

const ACT_LABELS = ['Act 1', 'Act 2A', 'Act 2B', 'Act 3']
const TOTAL_ROWS = 4

const SCENE_TYPES = [
  'None',
  'Opening',
  'Inciting Incident',
  'Turning Point',
  'Midpoint',
  'Climax',
  'Resolution',
  'Twist',
  'Reversal',
  'Setup',
  'Payoff',
]

export function SceneGrid() {
  const [scenes, setScenes] = useState(
    Array(TOTAL_ROWS).fill(null).map(() => [
      { type: 'None', text: '' } // one default scene per row
    ])
  );

  const handleTextChange = (rowIdx, cardIdx, value) => {
    const updated = [...scenes];
    updated[rowIdx][cardIdx].text = value;
    setScenes(updated);
  };

  const handleTypeChange = (rowIdx, cardIdx, newType) => {
    const updated = [...scenes];
    updated[rowIdx][cardIdx].type = newType;
    setScenes(updated);
  };

  const handleAddScene = (rowIdx) => {
    const updated = [...scenes];
    updated[rowIdx].push({ type: 'None', text: '' });
    setScenes(updated);
  };

  const handleDeleteScene = (rowIdx, cardIdx) => {
    const updated = [...scenes];
    updated[rowIdx].splice(cardIdx, 1);
    setScenes(updated);
  };

  return (
    <div className="max-w-[calc(100vw-82px)]">
      <div className="space-y-4">
        {scenes.map((row, rowIndex) => (
          <div key={rowIndex} className="w-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold">{ACT_LABELS[rowIndex]}</h3>
              <button
                onClick={() => handleAddScene(rowIndex)}
                className="text-sm px-2 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
              >
                + Add Scene
              </button>
            </div>

            <div className="w-full p-2 overflow-x-auto border-x-2 border-gray-200 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <div className="flex gap-2 min-w-max">
                {row.map((scene, cardIndex) => (
                  <div key={cardIndex} className="relative w-40 border border-gray-200 rounded bg-white flex flex-col">
                    {/* Dropdown for scene type */}
                    <select
                      value={scene.type}
                      onChange={(e) => handleTypeChange(rowIndex, cardIndex, e.target.value)}
                      className="text-xs border border-gray-200 rounded"
                    >
                      {SCENE_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>

                    {/* Textarea for scene text */}
                    <textarea
                      value={scene.text}
                      onChange={(e) => handleTextChange(rowIndex, cardIndex, e.target.value)}
                      placeholder={`Scene ${cardIndex + 1}`}
                      rows={8}
                      className="text-xs p-1 resize-none border border-gray-200 rounded focus:outline-none"
                    />

                   
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
