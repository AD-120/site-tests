
import React from 'react';

interface WaveformProps {
  isListening: boolean;
}

const Waveform: React.FC<WaveformProps> = ({ isListening }) => {
  const bars = Array.from({ length: 12 });
  
  return (
    <div className="flex items-end justify-center gap-1 h-8 w-full max-w-[100px]">
      {bars.map((_, i) => (
        <div
          key={i}
          className={`w-1 rounded-full bg-[#3b71fe] transition-all duration-300 ${
            isListening ? 'waveform-bar' : 'h-[15%]'
          }`}
          style={{
            animationDelay: isListening ? `${i * 0.1}s` : '0s',
            animationDuration: `${0.4 + Math.random() * 0.4}s`
          }}
        />
      ))}
    </div>
  );
};

export default Waveform;
