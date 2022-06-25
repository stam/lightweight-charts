import { merge } from '../helpers/strict-type-checks';

import { CustomTrendLinePaneView } from '../views/pane/custom-trend-line-pane-view';
import { IPaneView } from '../views/pane/ipane-view';
// import { PanePriceAxisView } from '../views/pane/pane-price-axis-view';
// import { CustomPriceLinePriceAxisView } from '../views/price-axis/custom-price-line-price-axis-view';
// import { IPriceAxisView } from '../views/price-axis/iprice-axis-view';

import { Coordinate } from './coordinate';
import { Series } from './series';
import { TimePoint } from './time-data';
import { InternalTrendLineOptions, TrendLineOptions } from './trend-line-options';

interface CoordinateToAndFrom {
	xStart: Coordinate;
	xEnd: Coordinate;
	yStart: Coordinate;
	yEnd: Coordinate;
}

let internalIdCounter = 0;

export class CustomTrendLine {
	private readonly _series: Series;
	private readonly _trendLineView: CustomTrendLinePaneView;
	// private readonly _priceAxisView: CustomPriceLinePriceAxisView;
	// private readonly _panePriceAxisView: PanePriceAxisView;
	private readonly _options: InternalTrendLineOptions<TimePoint>;

	public constructor(series: Series, options: TrendLineOptions<TimePoint>) {
		this._series = series;
		this._options = { ...options, internalId: internalIdCounter };
		this._trendLineView = new CustomTrendLinePaneView(series, this);

		internalIdCounter++;
		// this._priceAxisView = new CustomPriceLinePriceAxisView(series, this);
		// this._panePriceAxisView = new PanePriceAxisView(this._priceAxisView, series, series.model());
	}

	public applyOptions(options: Partial<TrendLineOptions<TimePoint>>): void {
		merge(this._options, options);
		this.update();
		this._series.model().lightUpdate();
	}

	public options(): InternalTrendLineOptions<TimePoint> {
		return this._options;
	}

	public paneViews(): readonly IPaneView[] {
		return [
			this._trendLineView,
			// this._panePriceAxisView,
		];
	}

	// public priceAxisView(): IPriceAxisView {
	// 	return this._priceAxisView;
	// }

	public update(): void {
		this._trendLineView.update();
		// this._priceAxisView.update();
	}

	public getCoords(): CoordinateToAndFrom | null {
		const series = this._series;
		const priceScale = series.priceScale();
		const timeScale = series.model().timeScale();

		if (timeScale.isEmpty() || priceScale.isEmpty()) {
			return null;
		}

		const firstValue = series.firstValue();
		if (firstValue === null) {
			return null;
		}

		const yStart = priceScale.priceToCoordinate(this._options.startPrice, firstValue.value);
		const yEnd = priceScale.priceToCoordinate(this._options.endPrice, firstValue.value);

		const timePointIndexStart = timeScale.timeToIndex(this._options.startTime, true);
		const timePointIndexEnd = timeScale.timeToIndex(this._options.endTime, true);

		if (!timePointIndexStart || !timePointIndexEnd) {
			return null;
		}

		const xStart = timeScale.indexToCoordinate(timePointIndexStart);
		const xEnd = timeScale.indexToCoordinate(timePointIndexEnd);

		return { xStart, xEnd, yStart, yEnd };
	}
}
