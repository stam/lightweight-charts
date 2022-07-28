import { merge } from '../helpers/strict-type-checks';

import { CustomTrendLinePaneView } from '../views/pane/custom-trend-line-pane-view';
import { IPaneView } from '../views/pane/ipane-view';
// import { PanePriceAxisView } from '../views/pane/pane-price-axis-view';
// import { CustomPriceLinePriceAxisView } from '../views/price-axis/custom-price-line-price-axis-view';
// import { IPriceAxisView } from '../views/price-axis/iprice-axis-view';

import { Coordinate } from './coordinate';
import { Series } from './series';
import { TimePoint } from './time-data';
import { TrendLineOptions } from './trend-line-options';

interface CoordinateToAndFrom {
	xStart: Coordinate;
	xEnd: Coordinate;
	yStart: Coordinate;
	yEnd: Coordinate;
}

let internalIdCounter = 0;

const readableDate = (t: TimePoint): string => {
	const parsedDate = new Date(t.timestamp * 1000);
	const userTimezoneOffset = parsedDate.getTimezoneOffset() * 60000;
	const utcDate = new Date(parsedDate.getTime() - userTimezoneOffset);

	return utcDate.toISOString().substring(0, 10);
};

export class CustomTrendLine {
	private readonly _series: Series;
	private readonly _trendLineView: CustomTrendLinePaneView;
	// private readonly _priceAxisView: CustomPriceLinePriceAxisView;
	// private readonly _panePriceAxisView: PanePriceAxisView;
	private readonly _options: TrendLineOptions<TimePoint>;

	public constructor(series: Series, options: TrendLineOptions<TimePoint>) {
		this._series = series;
		this._options = { ...options, id: internalIdCounter };
		this._trendLineView = new CustomTrendLinePaneView(series, this);

		internalIdCounter++;
		// this._priceAxisView = new CustomPriceLinePriceAxisView(series, this);
		// this._panePriceAxisView = new PanePriceAxisView(this._priceAxisView, series, series.model());
	}

	public applyOptions(options: Partial<TrendLineOptions<TimePoint>>): void {
		const { startTime, endTime, ...safeOptions } = options;
		// If our start and entime is the same,
		// merge does some hacky shit
		merge(this._options, safeOptions);
		if (startTime) {
			this._options.startTime = startTime;
		}
		if (endTime) {
			this._options.endTime = endTime;
		}
		this.update();
		this._series.model().lightUpdate();
	}

	public options(): TrendLineOptions<TimePoint> {
		return this._options;
	}

	public id(): number {
		return this._options.id === undefined ? -1 : this._options.id;
	}

	public externalOptions(): TrendLineOptions<string> {
		const options = this.options();
		return { ...options, startTime: readableDate(options.startTime), endTime: readableDate(options.endTime) };
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
