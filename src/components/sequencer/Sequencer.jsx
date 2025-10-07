import React, { useState, useEffect, useRef } from 'react';

function Sequencer({ isPlaying, bpm }) {
  const [grid, setGrid] = useState({
    kick: Array(16).fill(false),
    snare: Array(16).fill(false),
    hihat: Array(16).fill(false),
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [samples, setSamples] = useState({
    kick: null,
    snare: null,
    hihat: null,
  });
  const audioContextRef = useRef(null);
  const fileInputRefs = useRef({
    kick: null,
    snare: null,
    hihat: null,
  });

  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 16);
    }, (60 / bpm / 4) * 1000);
    return () => clearInterval(interval);
  }, [isPlaying, bpm]);

  useEffect(() => {
    if (isPlaying) {
      Object.keys(grid).forEach((drum) => {
        if (grid[drum][currentStep] && samples[drum]) {
          playSound(samples[drum]);
        }
      });
    }
  }, [currentStep, isPlaying]);

  const playSound = (audioBuffer) => {
    const source = audioContextRef.current.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContextRef.current.destination);
    source.start();
  };

  const handleFileUpload = (drum, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        audioContextRef.current.decodeAudioData(e.target.result, (buffer) => {
          setSamples((prev) => ({ ...prev, [drum]: buffer }));
        });
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const toggleStep = (drum, step) => {
    setGrid((prev) => ({
      ...prev,
      [drum]: prev[drum].map((val, i) => (i === step ? !val : val)),
    }));
  };

  return (
    <div className="bg-fl-gray p-4 border-b border-gray-700">
      <h2 className="text-white text-lg mb-4">Step Sequencer</h2>
      
      {/* Sound Kit Import Section */}
      <div className="mb-4 p-3 bg-gray-800 rounded">
        <h3 className="text-white text-sm mb-2">Import Sound Kit</h3>
        <div className="grid grid-cols-3 gap-2">
          {Object.keys(samples).map((drum) => (
            <div key={drum} className="flex flex-col">
              <label className="text-gray-400 text-xs mb-1 capitalize">{drum}</label>
              <input
                type="file"
                accept="audio/*"
                ref={(el) => (fileInputRefs.current[drum] = el)}
                onChange={(e) => handleFileUpload(drum, e)}
                className="text-xs text-gray-300 file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:bg-fl-accent file:text-white hover:file:bg-fl-accent-dark cursor-pointer"
              />
              {samples[drum] && <span className="text-green-500 text-xs mt-1">✓ Loaded</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Sequencer Grid */}
      {Object.keys(grid).map((drum) => (
        <div key={drum} className="mb-2">
          <div className="flex items-center gap-2">
            <span className="text-white text-xs w-12 capitalize">{drum}</span>
            <div className="flex gap-1">
              {grid[drum].map((active, i) => (
                <button
                  key={i}
                  onClick={() => toggleStep(drum, i)}
                  className={`w-8 h-8 rounded transition-all ${
                    active ? 'bg-fl-accent' : 'bg-gray-800'
                  } ${
                    currentStep === i && isPlaying ? 'ring-2 ring-white' : ''
                  } hover:bg-fl-accent-dark`}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sequencer;
