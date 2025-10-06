import React from 'react';

function Synth() {
  return (
    <div className="bg-fl-gray p-4 flex-1">
      <h2 className="text-white text-lg mb-2">Synthesizer</h2>
      <div className="bg-gray-800 rounded p-4 h-full">
        <div className="grid grid-cols-3 gap-2">
          {['Attack', 'Decay', 'Sustain', 'Release', 'Cutoff', 'Resonance'].map((param) => (
            <div key={param} className="flex flex-col">
              <label className="text-white text-sm mb-1">{param}</label>
              <input type="range" className="w-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Synth;
