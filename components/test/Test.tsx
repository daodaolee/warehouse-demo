'use client';

import React, { useState, useCallback } from 'react';
import WorkshopBoard from '../workshop/WorkshopBoard';
import WorkshopForm from '../workshop/WorkshopForm';
import { Workshop } from '../workshop/types';
import { mockWorkshops } from '../workshop/mockData';

interface TestProps {
  // props
}

const Test: React.FC<TestProps> = () => {
  // 状态管理
  const [workshops, setWorkshops] = useState<Workshop[]>(mockWorkshops);
  const [hoveredWorkshop, setHoveredWorkshop] = useState<Workshop | null>(null);

  // 配置参数
  const [scale, setScale] = useState<number>(100);
  const [subDivisions, setSubDivisions] = useState<number>(10);

  // 仓库区域尺寸（米）
  const warehouseWidth = 50;
  const warehouseHeight = 30;

  // 添加车间
  const addWorkshop = (workshopData: Omit<Workshop, 'id'>) => {
    const newWorkshop: Workshop = {
      id: Date.now().toString(),
      ...workshopData,
    };

    setWorkshops([...workshops, newWorkshop]);
  };

  // 处理比例尺变化
  const handleScaleChange = useCallback((newScale: number) => {
    setScale(newScale);
  }, []);

  return (
    <div className="flex flex-col gap-6 p-4 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">仓库看板设计器</h1>

      {/* 配置表单 */}
      <WorkshopForm
        onAddWorkshop={addWorkshop}
        scale={scale}
        subDivisions={subDivisions}
        onScaleChange={setScale}
        onSubDivisionsChange={setSubDivisions}
      />

      {/* 看板 */}
      <WorkshopBoard
        width={warehouseWidth}
        height={warehouseHeight}
        scale={scale}
        subDivisions={subDivisions}
        workshops={workshops}
        hoveredWorkshop={hoveredWorkshop}
        onHoverWorkshop={setHoveredWorkshop}
        onScaleChange={handleScaleChange}
        minScale={25}
        maxScale={300}
      />

      {/* 底部信息 */}
      <div className="mt-2 text-sm text-gray-500">
        <p>
          当前比例尺: 1米 = {scale}像素 | 小刻度数量: {subDivisions} | 按住Ctrl+滚轮可缩放
        </p>
        {hoveredWorkshop && (
          <p className="mt-1">
            选中: {hoveredWorkshop.name || `车间 ${hoveredWorkshop.id}`} | 位置: (
            {hoveredWorkshop.x}m, {hoveredWorkshop.y}m) | 尺寸: {hoveredWorkshop.width}m ×{' '}
            {hoveredWorkshop.height}m
          </p>
        )}
      </div>
    </div>
  );
};

export default Test;
