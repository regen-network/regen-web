import * as React from 'react';

import { format } from 'date-fns';
import BarChart from './BarChart';

export default {
  title: 'Charts',
  component: BarChart,
};

export const barChart = (): JSX.Element => {
  const data = [
    { date: '2021-Apr', tokens: 56861.875 },
    { date: '2021-May', tokens: 344298.5694 },
    { date: '2021-Jun', tokens: 337154.7361 },
    { date: '2021-Jul', tokens: 345489.0694 },
    { date: '2021-Aug', tokens: 341917.1528 },
    { date: '2021-Sep', tokens: 396050.0694 },
    { date: '2021-Oct', tokens: 396698.2778 },
    { date: '2021-Nov', tokens: 393827.0278 },
    { date: '2021-Dec', tokens: 418542.4028 },
    { date: '2022-Jan', tokens: 604735.6944 },
    { date: '2022-Feb', tokens: 1193871.111 },
    { date: '2022-Mar', tokens: 3029425.195 },
    { date: '2022-Apr', tokens: 3390454.361 },
    { date: '2022-May', tokens: 1701706.569 },
    { date: '2022-Jun', tokens: 1425918.319 },
    { date: '2022-Jul', tokens: 1650848.736 },
    { date: '2022-Aug', tokens: 1392180.903 },
    { date: '2022-Sep', tokens: 1357516.361 },
    { date: '2022-Oct', tokens: 1372091.903 },
    { date: '2022-Nov', tokens: 1352185.569 },
    { date: '2022-Dec', tokens: 1349644.861 },
    { date: '2023-Jan', tokens: 1355450.778 },
    { date: '2023-Feb', tokens: 1179245.486 },
    { date: '2023-Mar', tokens: 1343155.194 },
    { date: '2023-Apr', tokens: 1316934.569 },
    { date: '2023-May', tokens: 1310127.653 },
    { date: '2023-Jun', tokens: 1306387.736 },
    { date: '2023-Jul', tokens: 1441900.444 },
    { date: '2023-Aug', tokens: 1311723.153 },
    { date: '2023-Sep', tokens: 1260604.403 },
    { date: '2023-Oct', tokens: 1262894.444 },
    { date: '2023-Nov', tokens: 1249142.444 },
    { date: '2023-Dec', tokens: 1235097.903 },
    { date: '2024-Jan', tokens: 1044475.028 },
    { date: '2024-Feb', tokens: 810971.5694 },
    { date: '2024-Mar', tokens: 678487.1944 },
  ];

  return (
    <div style={{ width: 1047, height: 300 }}>
      <BarChart
        data={data}
        tickFormatX={t => {
          if (t && t.includes('Jan')) return t.replace('-Jan', '');
          return '';
        }}
        x="date"
        y="tokens"
        width={907}
        height={277}
        labels={({ datum }) =>
          datum.date ? format(new Date(datum.date), 'MMMM YYYY') : ''
        }
        barWidth={17}
      />
    </div>
  );
};
