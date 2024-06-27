import React from 'react';
import './button.css'; // Import your CSS file with styles

interface SampleButtonProps {
  title: string;
  isActive: boolean;
  onClick: () => void;
  key: string;
}

const SampleButton: React.FC<SampleButtonProps> = ({ key, title, isActive, onClick }) => {
  return (
    <button
      key={key}
      className={isActive ? 'button active' : 'button'}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SampleButton;
