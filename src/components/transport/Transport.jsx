import React from 'react';

function Transport({ bpm, setBpm, isPlaying, setIsPlaying }) {
  return (
    <div className="flex items-center gap-4">
      <button onClick={() => setIsPlaying(!isPlaying)} className="bg-fl-accent text-white px-4 py-2 rounded hover:bg-orange-600">
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <label className="flex items-center gap-2 text-white">
        BPM:
        <input type="number" value={bpm} onChange={(e) => setBpm(Number(e.target.value))} className="bg-gray-800 text-white w-20 px-2 py-1 rounded" />
      </label>
    </div>
  );
}

export default Transport;
