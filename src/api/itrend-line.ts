import { TrendLineOptions } from '../model/trend-line-options';

import { Time } from './data-consumer';

/**
 * Represents the interface for interacting with trend lines.
 */
export interface ITrendLine {
	/**
	 * Apply options to the trend line.
	 *
	 * @param options - Any subset of options.
	 * @example
	 * ```js
	 * trendLine.applyOptions({
	 *     startPrice: 80,
	 *     endPrice: 100,
	 *     startTime: '2022-01-01',
	 *     endTime: '2022-01-25',
	 *     color: 'red',
	 *     lineWidth: 3,
	 *     lineStyle: LightweightCharts.LineStyle.Dashed,
	 *     axisLabelVisible: false,
	 *     title: 'Support',
	 * });
	 * ```
	 */
	applyOptions(options: Partial<TrendLineOptions<Time>>): void;
}
