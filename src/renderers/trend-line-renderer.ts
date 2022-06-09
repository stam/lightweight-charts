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
}
