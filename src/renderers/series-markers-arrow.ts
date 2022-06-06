import { ceiledOdd } from '../helpers/mathex';

import { Coordinate } from '../model/coordinate';

import { hitTestSquare } from './series-markers-square';
import { shapeSize } from './series-markers-utils';

export enum Direction {
	UP,
	DOWN,
	LEFT,
	RIGHT,
}

export function drawArrow(
	direction: Direction,
	ctx: CanvasRenderingContext2D,
	centerX: Coordinate,
	centerY: Coordinate,
	size: number
): void {
	const arrowSize = shapeSize('arrowUp', size);
	const halfArrowSize = (arrowSize - 1) / 2;
	const baseSize = ceiledOdd(size / 2);
	const halfBaseSize = (baseSize - 1) / 2;

	ctx.beginPath();
	if (direction === Direction.UP) {
		// UP
		ctx.moveTo(centerX - halfArrowSize, centerY);
		ctx.lineTo(centerX, centerY - halfArrowSize);
		ctx.lineTo(centerX + halfArrowSize, centerY);
		ctx.lineTo(centerX + halfBaseSize, centerY);
		ctx.lineTo(centerX + halfBaseSize, centerY + halfArrowSize);
		ctx.lineTo(centerX - halfBaseSize, centerY + halfArrowSize);
		ctx.lineTo(centerX - halfBaseSize, centerY);
	} else if (direction === Direction.DOWN) {
		// DOWN
		ctx.moveTo(centerX - halfArrowSize, centerY);
		ctx.lineTo(centerX, centerY + halfArrowSize);
		ctx.lineTo(centerX + halfArrowSize, centerY);
		ctx.lineTo(centerX + halfBaseSize, centerY);
		ctx.lineTo(centerX + halfBaseSize, centerY - halfArrowSize);
		ctx.lineTo(centerX - halfBaseSize, centerY - halfArrowSize);
		ctx.lineTo(centerX - halfBaseSize, centerY);
	} else if (direction === Direction.LEFT) {
		ctx.moveTo(centerX, centerY - halfArrowSize);
		ctx.lineTo(centerX - halfArrowSize, centerY);
		ctx.lineTo(centerX, centerY + halfArrowSize);
		ctx.lineTo(centerX, centerY + halfBaseSize);
		ctx.lineTo(centerX + halfArrowSize, centerY + halfBaseSize);
		ctx.lineTo(centerX + halfArrowSize, centerY - halfBaseSize);
		ctx.lineTo(centerX, centerY - halfBaseSize);
	} else {
		ctx.moveTo(centerX, centerY - halfArrowSize);
		ctx.lineTo(centerX + halfArrowSize, centerY);
		ctx.lineTo(centerX, centerY + halfArrowSize);
		ctx.lineTo(centerX, centerY + halfBaseSize);
		ctx.lineTo(centerX - halfArrowSize, centerY + halfBaseSize);
		ctx.lineTo(centerX - halfArrowSize, centerY - halfBaseSize);
		ctx.lineTo(centerX, centerY - halfBaseSize);
	}

	ctx.fill();
}

export function hitTestArrow(
	centerX: Coordinate,
	centerY: Coordinate,
	size: number,
	x: Coordinate,
	y: Coordinate
): boolean {
	// TODO: implement arrow hit test
	return hitTestSquare(centerX, centerY, size, x, y);
}
