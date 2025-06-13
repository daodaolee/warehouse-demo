import React from 'react';
import { WorkshopItemProps } from './types';

const WorkshopItem: React.FC<WorkshopItemProps> = ({ workshop, scale, onHover, isHovered }) => {
  const { x, y, width, height, name, color = '#3b82f6' } = workshop;

  return (
    <div
      className={`absolute border-2 rounded flex items-center justify-center shadow-md transition-all hover:shadow-lg cursor-pointer ${isHovered ? 'z-10' : 'z-0'}`}
      style={{
        left: `${x * scale}px`,
        top: `${y * scale}px`,
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        borderColor: color,
        backgroundColor: `${color}1a`, // 10% opacity
        borderWidth: isHovered ? '3px' : '2px',
      }}
      onMouseEnter={() => onHover(workshop)}
      onMouseLeave={() => onHover(null)}
    >
      <div className="flex flex-col items-center p-2">
        <span className="text-xs font-semibold bg-white/90 px-2 py-1 rounded shadow-sm">
          {name || `车间 ${workshop.id}`}
        </span>
        <span className="text-xs mt-1 bg-white/70 px-2 py-0.5 rounded">
          {width}m × {height}m
        </span>
      </div>
    </div>
  );
};

export default WorkshopItem;
