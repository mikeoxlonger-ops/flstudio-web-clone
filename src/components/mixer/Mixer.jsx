import React from 'react';

function Mixer() {
  return (
    <div className="bg-fl-gray p-4 border-b border-gray-700 flex-1">
      <h2 className="text-white text-lg mb-2">Mixer</h2>
      <div className="flex gap-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-gray-800 w-12 h-32 rounded flex flex-col items-center justify-end p-1">
            <div className="bg-fl-accent w-full h-16 rounded-t"/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mixer;
