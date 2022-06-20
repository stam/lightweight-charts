import { Coordinate } from '../model/coordinate';

import { shapeSize } from './series-markers-utils';

export function drawDragHandle(ctx: CanvasRenderingContext2D, centerX: Coordinate, centerY: Coordinate, size: number): void {
	const circleSize = shapeSize('circle', size);
	const halfSize = (circleSize - 1) / 2;

	ctx.beginPath();
	ctx.arc(centerX, centerY, halfSize, 0, 2 * Math.PI, false);
	ctx.strokeStyle = '#e46be7';
	ctx.fill();
	ctx.stroke();
}
