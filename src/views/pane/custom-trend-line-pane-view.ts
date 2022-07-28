import { CustomTrendLine } from '../../model/custom-trend-line';
import { Series } from '../../model/series';

import { SeriesTrendLinePaneView } from './series-trend-line-pane-view';

export class CustomTrendLinePaneView extends SeriesTrendLinePaneView {
	private readonly _trendLine: CustomTrendLine;

	public constructor(series: Series, trendLine: CustomTrendLine) {
		super(series);
		this._trendLine = trendLine;
		this._lineRendererData.internalId = trendLine.id();
	}

	protected _updateImpl(height: number, width: number): void {
		const data = this._lineRendererData;
		data.visible = false;

		const lineOptions = this._trendLine.options();

		if (!this._series.visible() || !lineOptions.lineVisible) {
			return;
		}

		const coords = this._trendLine.getCoords();
		if (!coords) {
			return;
		}
		const { xStart, xEnd, yStart, yEnd } = coords;

		data.visible = true;
		data.xStart = xStart;
		data.xEnd = xEnd;
		data.yStart = yStart;
		data.yEnd = yEnd;
		data.color = lineOptions.color;
		data.width = width;
		data.height = height;
		data.lineWidth = lineOptions.lineWidth;
		data.lineStyle = lineOptions.lineStyle;
	}
}
