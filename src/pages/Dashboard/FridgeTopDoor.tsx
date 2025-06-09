import React from 'react';

interface FridgeTopDoorProps {
  onSectionClick: (section: 'cleaning' | 'bills' | 'review') => void;
}

const FridgeTop: React.FC<FridgeTopDoorProps> = ({ onSectionClick }) => {
  return (
    <div className="fridge-top">
      <div className="border-top"></div>
      <h1 className="fridge-title">FLAT</h1>
      <div className="door-handle top"></div>
      <div className="button-container">
        {['cleaning', 'bills', 'review'].map((section) => (
          <button
            key={section}
            onClick={() => onSectionClick(section as 'cleaning' | 'bills' | 'review')}
          >
            {section.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="border-bottom"></div>
    </div>
  );
};

export default FridgeTop;
