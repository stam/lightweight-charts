import { TrendLineOptions } from '../../model/trend-line-options';
import { LineStyle } from '../../renderers/draw-line';

import { Time } from '../data-consumer';

export const trendLineOptionsDefaults: TrendLineOptions<Time> = {
	color: '#FF0000',
	startPrice: 0,
	endPrice: 0,
	startTime: '',
	endTime: '',
	lineStyle: LineStyle.Dashed,
	lineWidth: 1,
	lineVisible: true,
	axisLabelVisible: true,
	title: '',
};
