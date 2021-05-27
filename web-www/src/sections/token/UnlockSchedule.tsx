import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { Theme, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

import Section from 'web-components/src/components/section';
import BarChart from 'web-components/src/components/charts/BarChart';
import { TokenDescription as Description } from './Description';

const useStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(20),
    },
    [theme.breakpoints.down('xs')]: {
      paddingBottom: theme.spacing(12),
    },
  },
  center: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  title: {
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.typography.pxToRem(32),
    },
  },
  description: {
    fontSize: theme.typography.pxToRem(18),
    marginTop: theme.spacing(4),
  },
  chartScroll: {
    width: '100%',
    justifyContent: 'center',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    [theme.breakpoints.down('sm')]: {
      overflowX: 'scroll',
      overflowY: 'hidden',
    },
  },
  chartWrapper: {
    width: theme.spacing(300),
    height: theme.spacing(87.5),
  },
}));

type QueryData = {
  text: {
    unlockSchedule: {
      title: string;
      subtitle: string;
    };
  };
};

interface TokenUnlock {
  date: string;
  tokens: number;
}

const data: TokenUnlock[] = [
  { date: 'April 2021', tokens: 56861.875 },
  { date: 'May 2021', tokens: 344298.5694 },
  { date: 'June 2021', tokens: 337154.7361 },
  { date: 'July 2021', tokens: 345489.0694 },
  { date: 'August 2021', tokens: 341917.1528 },
  { date: 'September 2021', tokens: 396050.0694 },
  { date: 'October 2021', tokens: 396698.2778 },
  { date: 'November 2021', tokens: 393827.0278 },
  { date: 'December 2021', tokens: 418542.4028 },
  { date: 'January 2022', tokens: 604735.6944 },
  { date: 'February 2022', tokens: 1193871.111 },
  { date: 'March 2022', tokens: 3029425.195 },
  { date: 'April 2022', tokens: 3390454.361 },
  { date: 'May 2022', tokens: 1701706.569 },
  { date: 'June 2022', tokens: 1425918.319 },
  { date: 'July 2022', tokens: 1650848.736 },
  { date: 'August 2022', tokens: 1392180.903 },
  { date: 'September 2022', tokens: 1357516.361 },
  { date: 'October 2022', tokens: 1372091.903 },
  { date: 'November 2022', tokens: 1352185.569 },
  { date: 'December 2022', tokens: 1349644.861 },
  { date: 'January 2023', tokens: 1355450.778 },
  { date: 'February 2023', tokens: 1179245.486 },
  { date: 'March 2023', tokens: 1343155.194 },
  { date: 'April 2023', tokens: 1316934.569 },
  { date: 'May 2023', tokens: 1310127.653 },
  { date: 'June 2023', tokens: 1306387.736 },
  { date: 'July 2023', tokens: 1441900.444 },
  { date: 'August 2023', tokens: 1311723.153 },
  { date: 'September 2023', tokens: 1260604.403 },
  { date: 'October 2023', tokens: 1262894.444 },
  { date: 'November 2023', tokens: 1249142.444 },
  { date: 'December 2023', tokens: 1235097.903 },
  { date: 'January 2024', tokens: 1044475.028 },
  { date: 'February 2024', tokens: 810971.5694 },
  { date: 'March 2024', tokens: 678487.1944 },
];

const formatter = new Intl.NumberFormat('en-US');

const UnlockSchedule = (): JSX.Element => {
  const styles = useStyles();

  const {
    text: {
      unlockSchedule: { title, subtitle },
    },
  } = useStaticQuery<QueryData>(graphql`
    query {
      text: tokenYaml {
        unlockSchedule {
          title
          subtitle
        }
      }
    }
  `);

  return (
    <Section
      title={title}
      classes={{ root: clsx(styles.root, styles.center), title: styles.title }}
    >
      <Description className={clsx(styles.description, styles.center)}>{subtitle}</Description>
      <div className={styles.chartScroll}>
        <div className={styles.chartWrapper}>
          <BarChart
            data={data}
            x="date"
            y="tokens"
            width={907}
            height={300}
            barWidth={14.5}
            tickFormatX={(t: string) => {
              if (t && t.includes('Jan')) return t.replace('-Jan', '');
              return '';
            }}
            labels={data => [data.datum.date, `${formatter.format(Math.floor(data.datum.tokens))} tokens`]}
          />
        </div>
      </div>
    </Section>
  );
};

export default UnlockSchedule;
