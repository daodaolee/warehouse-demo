export interface Workshop {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  name?: string;
  color?: string;
}

export interface RulerProps {
  scale: number;
  subDivisions: number;
  length: number;
  scrollOffset: number;
  orientation: 'horizontal' | 'vertical';
}

export interface WorkshopItemProps {
  workshop: Workshop;
  scale: number;
  onHover: (workshop: Workshop | null) => void;
  isHovered: boolean;
}

export interface GridCanvasProps {
  width: number;
  height: number;
  scale: number;
  cellSize?: number;
}

export interface WorkshopBoardProps {
  width: number;
  height: number;
  scale: number;
  subDivisions: number;
  workshops: Workshop[];
  hoveredWorkshop: Workshop | null;
  onHoverWorkshop: (workshop: Workshop | null) => void;
  onScaleChange?: (scale: number) => void; // 添加比例尺变化回调
  minScale?: number; // 最小缩放比例
  maxScale?: number; // 最大缩放比例
}

export interface WorkshopFormProps {
  onAddWorkshop: (workshop: Omit<Workshop, 'id'>) => void;
  scale: number;
  subDivisions: number;
  onScaleChange: (scale: number) => void;
  onSubDivisionsChange: (subDivisions: number) => void;
}
