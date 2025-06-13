import React from 'react';
import { RulerProps } from './types';

const Ruler: React.FC<RulerProps> = ({
  scale,
  subDivisions,
  length,
  scrollOffset,
  orientation,
}) => {
  const isHorizontal = orientation === 'horizontal';
  const rulerLength = length * scale;

  const renderDivisions = () => {
    const divisions = [];
    for (let i = 0; i < length; i++) {
      divisions.push(
        <div
          key={`main-${i}`}
          className="relative flex-none"
          style={
            isHorizontal
              ? { width: `${scale}px`, height: '40px' }
              : { height: `${scale}px`, width: '50px' }
          }
        >
          {/* 主刻度线 */}
          <div
            className={
              isHorizontal
                ? 'absolute bottom-0 left-0 w-[1px] h-5 bg-gray-500'
                : 'absolute top-0 right-0 h-[1px] w-5 bg-gray-500'
            }
          ></div>

          <div
            className={
              isHorizontal
                ? 'absolute bottom-0 left-0 text-xs flex items-end pb-1 text-gray-600 font-medium'
                : 'absolute top-0 right-0 h-full flex items-center justify-end pr-2 text-xs text-gray-600 font-medium'
            }
            style={isHorizontal ? { width: `${scale}px` } : {}}
          >
            <span>{i}m</span>
          </div>

          {/* 小刻度线 */}
          {Array.from({ length: subDivisions - 1 }).map((_, j) => (
            <div
              key={`${i}-sub-${j}`}
              className="absolute"
              style={
                isHorizontal
                  ? {
                      bottom: 0,
                      left: `${((j + 1) * scale) / subDivisions}px`,
                      width: '1px',
                      height: j === Math.floor(subDivisions / 2) - 1 ? '6px' : '4px',
                      backgroundColor:
                        j === Math.floor(subDivisions / 2) - 1
                          ? 'rgb(107 114 128)'
                          : 'rgb(156 163 175)',
                    }
                  : {
                      right: 0,
                      top: `${((j + 1) * scale) / subDivisions}px`,
                      height: '1px',
                      width: j === Math.floor(subDivisions / 2) - 1 ? '3.5px' : '2px',
                      backgroundColor:
                        j === Math.floor(subDivisions / 2) - 1
                          ? 'rgb(107 114 128)'
                          : 'rgb(156 163 175)',
                    }
              }
            ></div>
          ))}
        </div>,
      );
    }
    return divisions;
  };

  return (
    <div
      className={isHorizontal ? 'flex' : ''}
      style={{
        width: isHorizontal ? `${rulerLength}px` : '50px',
        height: isHorizontal ? '40px' : `${rulerLength}px`,
        transform: isHorizontal
          ? `translateX(-${scrollOffset}px)`
          : `translateY(-${scrollOffset}px)`,
      }}
    >
      {renderDivisions()}
    </div>
  );
};

export default Ruler;
