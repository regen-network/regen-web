import { useMediaQuery, useTheme } from '@mui/material';
import { LineSegment, VictoryLabel, VictoryPie } from 'victory';

export interface AreaActionsProps {
  preservationArea: number;
  restorationArea: number;
  preservationLabel: string;
  restorationLabel: string;
}

export default function AreaActions({
  preservationArea,
  restorationArea,
  preservationLabel,
  restorationLabel,
}: AreaActionsProps) {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('sm'));

  const data = [
    { name: preservationLabel, value: preservationArea },
    { name: restorationLabel, value: restorationArea },
  ].map(item => ({ x: item.name, y: item.value }));

  const colors = ['rgba(var(--bc-neutral-200))', 'rgba(var(--bc-green-500))'];
  const labelFontSize = mobile ? '12px' : '14px';

  return (
    <div className="-m-[20px] -mt-[40px]">
      <VictoryPie
        data={data}
        width={310}
        height={160}
        colorScale={colors}
        startAngle={-90}
        endAngle={270}
        labels={({ datum }) => [datum.x, `${datum.y} ha.`]}
        labelIndicator={
          <LineSegment
            style={{
              stroke: '#A5A4A4',
              strokeDasharray: 1,
              fill: 'none',
            }}
          />
        }
        labelIndicatorInnerOffset={30}
        labelIndicatorOuterOffset={15}
        labelComponent={
          <VictoryLabel
            style={[
              {
                fontWeight: '700',
                fontFamily: 'inherit',
                fontSize: labelFontSize,
              },
              {
                fontWeight: '400',
                fontFamily: 'inherit',
                fontSize: labelFontSize,
              },
            ]}
          />
        }
      />
    </div>
  );
}
