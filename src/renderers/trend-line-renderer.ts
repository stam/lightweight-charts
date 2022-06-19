import { HoveredObject } from '../model/chart-model';
import { Coordinate } from '../model/coordinate';

import { drawDiagonalLine, LineStyle, LineWidth, setLineStyle } from './draw-line';
import { IPaneRenderer } from './ipane-renderer';

export interface TrendLineRendererData {
	color: string;
	lineStyle: LineStyle;
	lineWidth: LineWidth;

	xStart: Coordinate;
	xEnd: Coordinate;
	yStart: Coordinate;
	yEnd: Coordinate;

	width: number;
	height: number;
	visible?: boolean;
}

export class TrendLineRenderer implements IPaneRenderer {
	private _data: TrendLineRendererData | null = null;

	public setData(data: TrendLineRendererData): void {
		this._data = data;
	}

	public draw(ctx: CanvasRenderingContext2D, pixelRatio: number, isHovered: boolean, hitTestData?: unknown): void {
		if (this._data === null) {
			return;
		}

		if (this._data.visible === false) {
			return;
		}

		const xStart = Math.round(this._data.xStart * pixelRatio);
		const xEnd = Math.round(this._data.xEnd * pixelRatio);
		const yStart = Math.round(this._data.yStart * pixelRatio);
		const yEnd = Math.round(this._data.yEnd * pixelRatio);

		ctx.lineCap = 'butt';
		ctx.strokeStyle = this._data.color;
		ctx.lineWidth = Math.floor(this._data.lineWidth * pixelRatio);
		setLineStyle(ctx, this._data.lineStyle);
		drawDiagonalLine(ctx, xStart, xEnd, yStart, yEnd);
	}

	public hitTest(x: Coordinate, y: Coordinate): HoveredObject | null {
		if (this._data === null) {
			return null;
		}

		const nonRetardedSortFunction = (a: number, b: number) => a - b;

		// Start and end don't necessarily mean min and max
		const xRange = [this._data.xStart, this._data.xEnd].sort(nonRetardedSortFunction);
		const yRange = [this._data.yStart, this._data.yEnd].sort(nonRetardedSortFunction);

		// Check within massive hitbox
		if (x < xRange[0] || x > xRange[1] || y < yRange[0] || y > yRange[1]) {
			return null;
		}

		const slope = (this._data.yEnd - this._data.yStart) / (this._data.xEnd - this._data.xStart);
		const localX = x - this._data.xStart;
		const localY = y - this._data.yStart;
		const targetY = slope * localX;

		const HIT_RADIUS = 5;
		const targetYWithinBounds = Math.abs(localY - targetY) < HIT_RADIUS + this._data.lineWidth;

		// TODO: proper internal and external IDs
		if (targetYWithinBounds) {
			return {
				hitTestData: 69,
				externalId: '420',
				interactive: true,
			};
		}
		return null;
	}
}
