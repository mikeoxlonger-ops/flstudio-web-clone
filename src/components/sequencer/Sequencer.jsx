import React from 'react';

function Sequencer({ isPlaying, bpm }) {
  return (
    <div className="bg-fl-gray p-4 border-b border-gray-700">
      <h2 className="text-white text-lg mb-2">Step Sequencer</h2>
      <div className="grid grid-cols-16 gap-1">
        {Array.from({ length: 64 }).map((_, i) => (
          <button
            key={i}
            className="w-8 h-8 bg-gray-800 hover:bg-fl-accent transition-colors rounded"
          />
        ))}
      </div>
    </div>
  );
}

export default Sequencer;
