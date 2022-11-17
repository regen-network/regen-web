import { ServiceClientImpl } from '@regen-network/api/lib/generated/cosmos/tx/v1beta1/service';
import ReactHtmlParser from 'html-react-parser';
import { makeStyles } from 'tss-react/mui';

import ContainedButton from '../buttons/ContainedButton';
import ShieldIcon from '../icons/ShieldIcon';
import { Title } from '../typography';
import { Event } from './';

interface TimelineItemProps extends Event {
  circleColor: string;
  barColor: string;
  odd: boolean;
  last: boolean;
  txClient?: ServiceClientImpl;
  onViewOnLedger: (creditVintage: any) => void;
  creditVintage?: any;
}

interface StyleProps {
  circleColor: string;
  barColor: string;
  odd: boolean;
  last: boolean;
}

const useStyles = makeStyles<StyleProps>()(
  (theme, { barColor, circleColor, last, odd }) => ({
    content: {
      backgroundColor: theme.palette.primary.main,
      position: 'relative',
      border: `1px solid ${theme.palette.grey[100]}`,
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.05)',
      borderRadius: '10px',
      paddingTop: theme.spacing(4.75),
      paddingRight: theme.spacing(5.5),
      paddingBottom: theme.spacing(6.25),
      paddingLeft: theme.spacing(5),
      [theme.breakpoints.up('sm')]: {
        width: '75%',
        marginRight: odd ? '0' : theme.spacing(7.75),
        marginLeft: odd ? theme.spacing(7.75) : '0',
      },
      [theme.breakpoints.down('sm')]: {
        width: '100%',
        marginRight: 0, // theme.spacing(5.75),
        marginBottom: theme.spacing(5),
      },
      '&:after': {
        content: '""',
        borderRadius: '2px',
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        [theme.breakpoints.up('sm')]: {
          right: odd ? 'auto' : theme.spacing(-2),
          left: odd ? theme.spacing(-2) : 'auto',
          borderRight: odd ? 'none' : `1px solid ${theme.palette.grey[100]}`,
          borderTop: odd ? 'none' : `1px solid ${theme.palette.grey[100]}`,
          borderLeft: odd ? `1px solid ${theme.palette.grey[100]}` : 'none',
          borderBottom: odd ? `1px solid ${theme.palette.grey[100]}` : 'none',
          top: last ? 'auto' : theme.spacing(2),
          bottom: last ? theme.spacing(2) : 'auto',
        },
        [theme.breakpoints.down('sm')]: {
          left: theme.spacing(-2),
          borderLeft: `1px solid ${theme.palette.grey[100]}`,
          borderBottom: `1px solid ${theme.palette.grey[100]}`,
          top: theme.spacing(2),
        },
        transform: 'rotate(45deg)',
        width: theme.spacing(4),
        height: theme.spacing(4),
        zIndex: 100,
      },
    },
    date: {
      lineHeight: '150%',
      color: theme.palette.info.main,
      paddingBottom: theme.spacing(0.75),
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.875rem',
      },
    },
    description: {
      color: theme.palette.info.main,
      [theme.breakpoints.up('sm')]: {
        fontSize: '0.875rem',
        lineHeight: '150%',
      },
      [theme.breakpoints.down('sm')]: {
        fontSize: '0.75rem',
        lineHeight: '145%',
      },
      whiteSpace: 'pre-line',
      paddingTop: theme.spacing(1.5),
      '& p': {
        margin: 0,
      },
    },
    bar: {
      backgroundColor: barColor,
      [theme.breakpoints.up('sm')]: {
        right: odd ? 'auto' : `calc(${theme.spacing(-7.75 - 1.5 / 2)} - 1px)`,
        left: odd ? `calc(${theme.spacing(-7.75 - 1.5 / 2)} - 1px)` : 'auto',
        top: last ? 'auto' : theme.spacing(5.75 + 1.75),
        bottom: last ? theme.spacing(5.75 + 1.75) : 'auto',
        width: theme.spacing(1.5),
        height: '100%',
      },
      [theme.breakpoints.down('sm')]: {
        display: last ? 'none' : 'inherit',
        left: theme.spacing(-5.75 - 1 / 2),
        top: theme.spacing(4.5 + 1.75),
        width: theme.spacing(1),
        height: `calc(100% + ${theme.spacing(5)})`,
      },
      position: 'absolute',
    },
    circle: {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '50%',
      borderColor: circleColor,
      borderStyle: 'solid',
      position: 'absolute',
      boxSizing: 'border-box',
      [theme.breakpoints.up('sm')]: {
        right: odd ? 'auto' : `calc(${theme.spacing(-7.75 - 5.75 / 2)} - 1px)`,
        left: odd ? `calc(${theme.spacing(-7.75 - 5.75 / 2)} - 1px)` : 'auto',
        top: last ? 'auto' : theme.spacing(2),
        bottom: last ? theme.spacing(2) : 'auto',
        width: theme.spacing(5.75),
        height: theme.spacing(5.75),
        borderWidth: theme.spacing(1),
      },
      [theme.breakpoints.down('sm')]: {
        left: theme.spacing(-5.75 - 4.5 / 2),
        top: theme.spacing(2),
        width: theme.spacing(4.5),
        height: theme.spacing(4.5),
        borderWidth: theme.spacing(0.75),
      },
      zIndex: 100,
    },
    ledgerBtn: {
      padding: theme.spacing(2, 4),
      marginTop: theme.spacing(4),
      fontSize: theme.spacing(3.5),
    },
    view: {
      color: theme.palette.secondary.main,
      letterSpacing: '1px',
      textTransform: 'uppercase',
      fontWeight: 800,
      fontSize: theme.spacing(3),
      lineHeight: theme.spacing(3.75),
      paddingLeft: theme.spacing(9),
    },
  }),
);

export default function TimelineItem({
  date,
  summary,
  description,
  creditVintage,
  circleColor,
  barColor,
  odd,
  last,
  txClient,
  onViewOnLedger,
}: TimelineItemProps): JSX.Element {
  const { classes } = useStyles({ circleColor, barColor, odd, last });
  return (
    <div className={classes.content}>
      {date && <div className={classes.date}>{String(date)}</div>}
      <Title variant="h5" sx={{ display: 'flex' }}>
        {summary}
      </Title>
      {description && (
        <div className={classes.description}>
          {ReactHtmlParser(description)}
        </div>
      )}
      {creditVintage && txClient && (
        <ContainedButton
          className={classes.ledgerBtn}
          onClick={() => onViewOnLedger(creditVintage)}
          startIcon={<ShieldIcon />}
        >
          view on ledger
        </ContainedButton>
      )}
      <span className={classes.circle} />
      <div className={classes.bar} />
    </div>
  );
}
