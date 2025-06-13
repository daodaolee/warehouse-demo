import React from 'react';
import { GridCanvasProps } from './types';

const GridCanvas: React.FC<GridCanvasProps> = ({ width, height, scale, cellSize = 20 }) => {
  return (
    <div
      className="relative"
      style={{
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        backgroundSize: `${cellSize}px ${cellSize}px`,
        backgroundImage: `
          linear-gradient(to right, rgb(229 231 235 / 50%) 1px, transparent 1px),
          linear-gradient(to bottom, rgb(229 231 235 / 50%) 1px, transparent 1px),
          linear-gradient(to right, rgb(209 213 219 / 50%) ${scale}px, transparent ${scale}px),
          linear-gradient(to bottom, rgb(209 213 219 / 50%) ${scale}px, transparent ${scale}px)
        `,
        backgroundColor: '#f9fafb',
      }}
    />
  );
};

export default GridCanvas;
