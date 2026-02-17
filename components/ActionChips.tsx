
import React from 'react';

interface ActionChipsProps {
  onChipClick: (phrase: string) => void;
}

const SUGGESTED_PHRASES = [
  "אפשר להזמין?",
  "כמה זה עולה?",
  "אפשר תפריט?",
  "סליחה...",
];

const ActionChips: React.FC<ActionChipsProps> = ({ onChipClick }) => {
  return (
    <div className="flex gap-2 overflow-x-auto px-4 no-scrollbar">
      {SUGGESTED_PHRASES.map((phrase) => (
        <button
          key={phrase}
          onClick={() => onChipClick(phrase)}
          className="bg-white border border-gray-200 px-4 py-2.5 rounded-full text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 active:scale-95 transition-all whitespace-nowrap"
        >
          {phrase}
        </button>
      ))}
    </div>
  );
};

export default ActionChips;
