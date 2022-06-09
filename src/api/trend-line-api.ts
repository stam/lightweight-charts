import { CustomTrendLine } from '../model/custom-trend-line';
import { TimePoint } from '../model/time-data';
import { TrendLineOptions } from '../model/trend-line-options';

import { Time } from './data-consumer';
import { convertTime } from './data-layer';
import { ITrendLine } from './itrend-line';

export class TrendLine implements ITrendLine {
	private readonly _trendLine: CustomTrendLine;

	public constructor(trendLine: CustomTrendLine) {
		this._trendLine = trendLine;
	}

	public applyOptions(options: Partial<TrendLineOptions<Time>>): void {
		const { startTime, endTime, ...otherOptions } = options;
		const convertedOptions: Partial<TrendLineOptions<TimePoint>> = otherOptions;
		if (startTime) {
			convertedOptions.startTime = convertTime(startTime);
		}
		if (endTime) {
			convertedOptions.endTime = convertTime(endTime);
		}
		this._trendLine.applyOptions(convertedOptions);
	}

	public trendLine(): CustomTrendLine {
		return this._trendLine;
	}
}
