import { LineStyle, LineWidth } from '../renderers/draw-line';

export interface TrendLineOptions<TimeType> {
	startTime: TimeType;
	endTime: TimeType;
	startPrice: number;
	endPrice: number;

	/**
	 * Trend line's color.
	 *
	 * @defaultValue `''`
	 */
	color: string;
	/**
	 * Trend line's width in pixels.
	 *
	 * @defaultValue `1`
	 */
	lineWidth: LineWidth;
	/**
	 * Trend line's style.
	 *
	 * @defaultValue {@link LineStyle.Solid}
	 */
	lineStyle: LineStyle;
	/**
	 * Display line.
	 *
	 * @defaultValue `true`
	 */
	lineVisible: boolean;
	/**
	 * Display the trend price range in on the price scale.
	 *
	 * @defaultValue `true`
	 */
	axisLabelVisible: boolean;
	/**
	 * Trend line's on the chart pane.
	 *
	 * @defaultValue `''`
	 */
	title: string;
}
