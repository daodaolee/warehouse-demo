import React, { useState } from 'react';
import { WorkshopFormProps } from './types';

const WorkshopForm: React.FC<WorkshopFormProps> = ({
  onAddWorkshop,
  scale,
  subDivisions,
  onScaleChange,
  onSubDivisionsChange,
}) => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [width, setWidth] = useState<number>(1);
  const [height, setHeight] = useState<number>(1);
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('#3b82f6');

  const colors = [
    '#3b82f6', // blue
    '#8b5cf6', // purple
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#0ea5e9', // sky
    '#14b8a6', // teal
    '#f97316', // orange
    '#6366f1', // indigo
  ];

  const handleSubmit = () => {
    if (x < 0 || y < 0 || width <= 0 || height <= 0) {
      alert('请输入有效的坐标和尺寸');
      return;
    }

    onAddWorkshop({
      x,
      y,
      width,
      height,
      name: name.trim() || undefined,
      color,
    });

    // 重置表单
    setX(0);
    setY(0);
    setWidth(1);
    setHeight(1);
    setName('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
      <h2 className="text-lg font-medium mb-4">添加车间</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">X坐标 (米)</label>
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">Y坐标 (米)</label>
          <input
            type="number"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">长 (米)</label>
          <input
            type="number"
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">宽 (米)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(Number(e.target.value))}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">名称 (可选)</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="车间名称"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-600 mb-1">颜色</label>
          <div className="flex space-x-2">
            {colors.map((c) => (
              <div
                key={c}
                className={`w-6 h-6 rounded-full cursor-pointer transition-all hover:scale-110 ${color === c ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                style={{ backgroundColor: c }}
                onClick={() => setColor(c)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-t pt-4">
        <div className="flex space-x-4">
          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">比例尺 (像素/米)</label>
            <select
              value={scale}
              onChange={(e) => onScaleChange(Number(e.target.value))}
              className="border p-2 rounded"
            >
              <option value={50}>50px</option>
              <option value={75}>75px</option>
              <option value={100}>100px</option>
              <option value={150}>150px</option>
              <option value={200}>200px</option>
            </select>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 mb-1">小刻度数量</label>
            <select
              value={subDivisions}
              onChange={(e) => onSubDivisionsChange(Number(e.target.value))}
              className="border p-2 rounded"
            >
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition-colors"
        >
          添加车间
        </button>
      </div>
    </div>
  );
};

export default WorkshopForm;
