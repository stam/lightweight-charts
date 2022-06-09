import { TrendLineOptions } from '../../model/trend-line-options';
import { LineStyle } from '../../renderers/draw-line';

import { Time } from '../data-consumer';

export const trendLineOptionsDefaults: TrendLineOptions<Time> = {
	color: '#FF0000',
	startPrice: 0,
	endPrice: 0,
	startTime: '2022-01-01',
	endTime: '2022-04-01',
	lineStyle: LineStyle.Dashed,
	lineWidth: 1,
	lineVisible: true,
	axisLabelVisible: true,
	title: '',
};
