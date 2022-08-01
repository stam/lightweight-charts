import { Coordinate } from '../model/coordinate';

import { shapeSize } from './series-markers-utils';

const DRAG_HANDLE_SIZE = 20;

export function drawDragHandle(ctx: CanvasRenderingContext2D, centerX: Coordinate, centerY: Coordinate, thick: boolean): void {
	const circleSize = shapeSize('circle', DRAG_HANDLE_SIZE);
	const halfSize = (circleSize - 1) / 2;

	ctx.beginPath();
	ctx.arc(centerX, centerY, halfSize, 0, 2 * Math.PI, false);
	ctx.strokeStyle = '#e46be7';
	ctx.fill();

	if (thick) {
		ctx.lineWidth = 2;
	}
	ctx.stroke();
	ctx.lineWidth = 1;
}
