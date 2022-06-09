import { CustomTrendLine } from '../../model/custom-trend-line';
import { Series } from '../../model/series';

import { SeriesHorizontalLinePaneView } from './series-horizontal-line-pane-view';


// TODO: use proper trendLineRenderer
export class CustomTrendLinePaneView extends SeriesHorizontalLinePaneView {
	private readonly _trendLine: CustomTrendLine;

	public constructor(series: Series, priceLine: CustomTrendLine) {
		super(series);
		this._trendLine = priceLine;
	}

	protected _updateImpl(height: number, width: number): void {
		const data = this._lineRendererData;
		data.visible = false;

		const lineOptions = this._trendLine.options();

		if (!this._series.visible() || !lineOptions.lineVisible) {
			return;
		}

		const y = this._trendLine.yCoord();
		if (y === null) {
			return;
		}

		data.visible = true;
		data.y = y;
		data.color = lineOptions.color;
		data.width = width;
		data.height = height;
		data.lineWidth = lineOptions.lineWidth;
		data.lineStyle = lineOptions.lineStyle;
	}
}
