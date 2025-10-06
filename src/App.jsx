import React, { useState } from 'react';
import Sequencer from './components/sequencer/Sequencer';
import PianoRoll from './components/pianoroll/PianoRoll';
import Mixer from './components/mixer/Mixer';
import Playlist from './components/playlist/Playlist';
import Transport from './components/transport/Transport';
import Synth from './components/synth/Synth';

function App() {
  const [bpm, setBpm] = useState(120);
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="h-screen w-screen bg-fl-dark flex flex-col overflow-hidden">
      <header className="bg-fl-gray p-2 flex items-center justify-between border-b border-gray-700">
        <h1 className="text-white text-xl font-bold">FL Studio Web Clone</h1>
        <Transport bpm={bpm} setBpm={setBpm} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      </header>
      <main className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <Sequencer isPlaying={isPlaying} bpm={bpm} />
          <PianoRoll />
          <Playlist />
        </div>
        <aside className="w-80 flex flex-col">
          <Mixer />
          <Synth />
        </aside>
      </main>
    </div>
  );
}

export default App;
