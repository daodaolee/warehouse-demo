import React, { useRef, useState, useEffect, useCallback } from 'react';
import { WorkshopBoardProps } from './types';
import Ruler from './Ruler';
import WorkshopItem from './Workshop';
import GridCanvas from './GridCanvas';

const WorkshopBoard: React.FC<WorkshopBoardProps> = ({
  width,
  height,
  scale,
  subDivisions,
  workshops,
  hoveredWorkshop,
  onHoverWorkshop,
  onScaleChange,
  minScale = 25, // 默认最小缩放为25px/米
  maxScale = 300, // 默认最大缩放为300px/米
}) => {
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // 处理滚动事件
  const handleScroll = useCallback(() => {
    if (contentRef.current) {
      setScrollLeft(contentRef.current.scrollLeft);
      setScrollTop(contentRef.current.scrollTop);
    }
  }, []);

  // 处理滚轮缩放
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      // 如果按住Ctrl键则进行缩放，否则正常滚动
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault(); // 阻止默认滚动行为

        if (!onScaleChange) return;

        // 计算新的缩放比例，delta为负表示放大，为正表示缩小
        const scaleFactor = e.deltaY < 0 ? 1.1 : 0.9;
        const newScale = Math.min(maxScale, Math.max(minScale, scale * scaleFactor));

        // 如果新比例与当前比例不同，则触发比例变化
        if (newScale !== scale) {
          onScaleChange(Math.round(newScale));

          // 可以在这里添加缩放时保持鼠标位置不变的逻辑
          // 这需要计算鼠标在内容区域的相对位置，并调整滚动位置
        }
      }
    },
    [scale, onScaleChange, minScale, maxScale],
  );

  // 监听滚动事件
  useEffect(() => {
    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // 监听滚轮事件
  useEffect(() => {
    const boardElement = boardRef.current;
    if (boardElement) {
      boardElement.addEventListener('wheel', handleWheel as EventListener, { passive: false });
      return () => boardElement.removeEventListener('wheel', handleWheel as EventListener);
    }
  }, [handleWheel]);

  return (
    <div
      ref={boardRef}
      className="border rounded-lg shadow-md relative bg-white"
      style={{ width: '100%', height: '70vh', overflow: 'hidden' }}
    >
      {/* 缩放提示 */}
      <div className="absolute bottom-2 right-2 z-40 bg-white/70 text-xs text-gray-600 px-2 py-1 rounded shadow-sm">
        按住 Ctrl 键 + 滚轮缩放
      </div>

      {/* 左上角空白区域 */}
      <div
        className="absolute top-0 left-0 z-30 bg-white"
        style={{ width: '50px', height: '40px' }}
      ></div>

      {/* X轴刻度 - 固定在顶部 */}
      <div
        className="absolute top-0 left-[50px] bg-white z-20 border-b"
        style={{
          width: 'calc(100% - 50px)',
          height: '40px',
          overflowX: 'hidden',
        }}
      >
        <Ruler
          scale={scale}
          subDivisions={subDivisions}
          length={width}
          scrollOffset={scrollLeft}
          orientation="horizontal"
        />
      </div>

      {/* Y轴刻度 - 固定在左侧 */}
      <div
        className="absolute top-[40px] left-0 bg-white z-20 border-r"
        style={{
          width: '50px',
          height: 'calc(100% - 40px)',
          overflowY: 'hidden',
        }}
      >
        <Ruler
          scale={scale}
          subDivisions={subDivisions}
          length={height}
          scrollOffset={scrollTop}
          orientation="vertical"
        />
      </div>

      {/* 内容区域 - 可滚动 */}
      <div
        ref={contentRef}
        className="absolute top-[40px] left-[50px] overflow-auto"
        style={{
          width: 'calc(100% - 50px)',
          height: 'calc(100% - 40px)',
        }}
      >
        <div className="relative">
          {/* 网格背景 */}
          <GridCanvas width={width} height={height} scale={scale} />

          {/* 车间区域 */}
          {workshops.map((workshop) => (
            <WorkshopItem
              key={workshop.id}
              workshop={workshop}
              scale={scale}
              onHover={onHoverWorkshop}
              isHovered={hoveredWorkshop?.id === workshop.id}
            />
          ))}

          {/* 悬停指示线 */}
          {hoveredWorkshop && (
            <>
              {/* X轴悬停指示线(垂直贯穿) */}
              <div
                className="absolute top-0 border-l-2 border-red-500 border-dashed h-full pointer-events-none"
                style={{ left: `${hoveredWorkshop.x * scale}px` }}
              ></div>
              <div
                className="absolute top-0 border-l-2 border-red-500 border-dashed h-full pointer-events-none"
                style={{ left: `${(hoveredWorkshop.x + hoveredWorkshop.width) * scale}px` }}
              ></div>

              {/* Y轴悬停指示线(水平贯穿) */}
              <div
                className="absolute left-0 border-t-2 border-red-500 border-dashed w-full pointer-events-none"
                style={{ top: `${hoveredWorkshop.y * scale}px` }}
              ></div>
              <div
                className="absolute left-0 border-t-2 border-red-500 border-dashed w-full pointer-events-none"
                style={{ top: `${(hoveredWorkshop.y + hoveredWorkshop.height) * scale}px` }}
              ></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkshopBoard;
