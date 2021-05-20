import React from 'react';
import { useTheme } from '@material-ui/core';
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
  VictoryContainer,
  VictoryBarProps,
} from 'victory';

export interface BarChartProps extends VictoryBarProps {
  data: any[];
  tickFormatX?: any[] | ((tick: any, index: number, ticks: any[]) => string | number) | undefined;
  tickValuesX?: any[] | undefined;
  tickFormatY?: any[] | ((tick: any, index: number, ticks: any[]) => string | number) | undefined;
  tickValuesY?: any[] | undefined;
}

export default function RegenBarChart({
  data,
  tickFormatX,
  tickValuesX,
  tickFormatY,
  tickValuesY,
  ...victoryProps
}: BarChartProps): JSX.Element {
  const theme = useTheme();

  return (
    <VictoryChart
      domainPadding={20}
      theme={VictoryTheme.material}
      width={victoryProps.width}
      height={victoryProps.height}
    >
      <svg style={{ height: 0 }}>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0.46%" stopColor={theme.palette.secondary.main} />
            <stop offset="100%" stopColor={theme.palette.secondary.contrastText} />
          </linearGradient>
          <linearGradient id="hoverGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#515D89" />
            <stop offset="50%" stopColor="#7DC9BF" />
            <stop offset="100%" stopColor="#FAEBD1" />
          </linearGradient>
        </defs>
      </svg>
      <VictoryBar
        {...victoryProps}
        data={data}
        style={{
          data: {
            fill: 'url(#grad1)',
          },
        }}
        barWidth={17}
        containerComponent={<VictoryContainer responsive={false} />}
        labelComponent={
          <VictoryTooltip
            constrainToVisibleArea
            style={{
              fontFamily: theme.typography.fontFamily,
              fontSize: 14,
              fill: theme.palette.info.dark,
            }}
            flyoutStyle={{
              fill: theme.palette.grey[50],
              stroke: theme.palette.grey[600],
              // boxShadow: theme.shadows[4],doesn't work?
            }}
            flyoutPadding={20}
            dy={-1}
          />
        }
        events={[
          {
            target: 'data',
            eventHandlers: {
              onMouseOver: () => {
                return [
                  {
                    target: 'data',
                    mutation: () => ({ style: { fill: 'url(#hoverGradient)' } }),
                  },
                  {
                    target: 'labels',
                    mutation: () => ({ active: true }),
                  },
                ];
              },
              onMouseOut: () => {
                return [
                  {
                    target: 'data',
                    mutation: () => ({ style: { fill: 'url(#grad1)' } }),
                  },
                  {
                    target: 'labels',
                    mutation: () => ({ active: false }),
                  },
                ];
              },
            },
          },
        ]}
      />
      <VictoryAxis
        tickValues={tickValuesX}
        tickFormat={tickFormatX}
        style={{
          axis: { stroke: theme.palette.primary.contrastText, strokeWidth: 1 },
          grid: { display: 'none' },
          ticks: { display: 'none' },
          tickLabels: {
            fontSize: 14,
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.primary.contrastText,
            padding: 6,
          },
        }}
      />
      <VictoryAxis
        dependentAxis
        tickValues={tickValuesY}
        tickFormat={tickFormatY}
        style={{
          axis: { stroke: theme.palette.primary.contrastText, strokeWidth: 1 },
          grid: { display: 'none' },
          ticks: { display: 'none' },
          tickLabels: {
            fontSize: 14,
            fontFamily: theme.typography.fontFamily,
            color: theme.palette.primary.contrastText,
            padding: 6,
          },
        }}
      />
    </VictoryChart>
  );
}
