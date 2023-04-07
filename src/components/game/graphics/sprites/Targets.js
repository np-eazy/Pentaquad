import { drawRect, outlineRect } from "../utils/Shapes";

export const renderTargets = (canvas, targets, stage, xCellSize, yCellSize) => {
    // Draw outlines of Targets
    for (const target of targets) {
        outlineRect(
          canvas,
          target.x0 * xCellSize,
          target.y0 * yCellSize,
          (target.x1 - target.x0) * xCellSize,
          (target.y1 - target.y0) * yCellSize,
          "#ffffff"
        );
      }
      
      for (const target of stage.nextTargets) {
        outlineRect(
          canvas,
          target.x0 * xCellSize,
          target.y0 * yCellSize,
          (target.x1 - target.x0) * xCellSize,
          (target.y1 - target.y0) * yCellSize,
          "#a0a0a0"
        );
      }
} 
    
    