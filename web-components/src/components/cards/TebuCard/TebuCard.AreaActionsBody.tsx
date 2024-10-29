import { VictoryLabel, VictoryPie } from 'victory';

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
  const data = [
    { name: preservationLabel, value: preservationArea },
    { name: restorationLabel, value: restorationArea },
  ].map(item => ({ x: item.name, y: item.value }));

  const colors = ['rgba(var(--bc-neutral-200))', 'rgba(var(--bc-green-500))'];

  return (
    <div className="-m-[20px]">
      <VictoryPie
        data={data}
        width={310}
        height={175}
        colorScale={colors}
        labels={({ datum }) => [datum.x, `${datum.y} ha.`]}
        labelComponent={
          <VictoryLabel
            style={[
              { fontWeight: '700', fontFamily: 'inherit', fontSize: '14px' },
              { fontWeight: '400', fontFamily: 'inherit', fontSize: '14px' },
            ]}
          />
        }
      />
    </div>
  );
}
