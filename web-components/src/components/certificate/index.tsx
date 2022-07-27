import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import Grid from '@mui/material/Grid';
import { DefaultTheme as Theme, makeStyles } from '@mui/styles';
import clsx from 'clsx';

import { pluralize } from '../../utils/pluralize';
import RegenIcon from '../icons/RegenIcon';
import { Title } from '../typography';

export interface StakeholderInfo {
  companyName: string;
  personName: string;
  personRole: string;
  label: string;
}

interface StyleProps {
  background?: string;
}

interface CertificateProps {
  background: string;
  creditName: string;
  certificateTitle: string;
  creditUnitName?: string;
  projectName: string;
  creditsUnits: number;
  equivalentTonsCO2: number;
  buyerName: string;
  date: string | Date;
  stakeholders: StakeholderInfo[];
  retired?: boolean;
}

const useStyles = makeStyles<Theme, StyleProps>((theme: Theme) => ({
  root: {
    backgroundImage: props => `url("${props.background}")`,
    backgroundSize: 'cover',
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(8),
    },
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(3),
    },
  },
  content: {
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.grey[100]}`,
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(9.25)} ${theme.spacing(18.75)} ${theme.spacing(
        12.5,
      )}`,
    },
    [theme.breakpoints.down('sm')]: {
      padding: `${theme.spacing(3.25)} ${theme.spacing(2.75)} ${theme.spacing(
        7.25,
      )}`,
    },
  },
  bannerSide: {
    backgroundColor: theme.palette.secondary.dark,
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(16),
      height: theme.spacing(21.75),
      bottom: theme.spacing(-5.5),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(6),
      height: theme.spacing(8),
      bottom: theme.spacing(-2.12),
    },
  },
  whiteTriangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    [theme.breakpoints.up('sm')]: {
      borderWidth: `${theme.spacing(10.875)} 0 ${theme.spacing(
        10.875,
      )} ${theme.spacing(5)}`,
    },
    [theme.breakpoints.down('sm')]: {
      borderWidth: `${theme.spacing(4)} 0 ${theme.spacing(4)} ${theme.spacing(
        1.85,
      )}`,
    },
    borderColor: `transparent transparent transparent ${theme.palette.primary.main}`,
  },
  greenTriangle: {
    width: 0,
    height: 0,
    position: 'absolute',
    right: 0,
    bottom: 0,
    borderStyle: 'solid',
    [theme.breakpoints.up('sm')]: {
      borderWidth: `0 ${theme.spacing(5.5)} ${theme.spacing(5.5)} 0`,
    },
    [theme.breakpoints.down('sm')]: {
      borderWidth: `0 ${theme.spacing(2)} ${theme.spacing(2)} 0`,
    },
    borderColor: `transparent ${theme.palette.secondary.contrastText} transparent transparent`,
  },
  bannerSideRight: {
    transform: 'scale(-1, 1)',
    right: 0,
  },
  bannerContent: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main,
    lineHeight: '130%',
    [theme.breakpoints.up('sm')]: {
      padding: `${theme.spacing(4.5)} ${theme.spacing(7)}`,
      marginLeft: theme.spacing(9.5),
      marginRight: theme.spacing(9.5),
    },
    [theme.breakpoints.down('sm')]: {
      // width: theme.spacing(59.5),
      padding: `${theme.spacing(1.75)} ${theme.spacing(3.5)}`,
      fontSize: theme.spacing(3.25),
      marginLeft: theme.spacing(3.65),
      marginRight: theme.spacing(3.65),
    },
    zIndex: 1,
    position: 'relative',
    textAlign: 'center',
  },
  banner: {
    position: 'relative',
    margin: '0 auto',
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(180),
      marginTop: theme.spacing(31),
      marginBottom: theme.spacing(2.5 + 5.5),
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(67),
      marginTop: theme.spacing(11.5),
      marginBottom: theme.spacing(1 + 2.12),
    },
  },
  icon: {
    float: 'right',
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(43.75),
      height: theme.spacing(18.25),
    },
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(15.5),
      height: theme.spacing(7),
    },
  },
  text: {
    margin: '0 auto',
    textAlign: 'center',
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(135.75),
      fontSize: theme.spacing(5),
      paddingBottom: theme.spacing(25),
      lineHeight: '180%',
    },
    [theme.breakpoints.down('sm')]: {
      maxWidth: theme.spacing(54.75),
      fontSize: theme.spacing(2.9),
      paddingBottom: theme.spacing(6),
      lineHeight: '155%',
    },
  },
  personName: {
    color: theme.palette.info.dark,
    fontFamily: '"FoxesInLove",-apple-system,sans-serif',
    letterSpacing: '2px',
    [theme.breakpoints.up('sm')]: {
      lineHeight: '150%',
      fontSize: theme.spacing(4),
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: '140%',
      fontSize: theme.spacing(1.75),
    },
  },
  companyInfo: {
    fontWeight: 700,
    [theme.breakpoints.up('sm')]: {
      lineHeight: '150%',
      fontSize: theme.spacing(3.5),
      paddingTop: theme.spacing(3.75),
      paddingBottom: theme.spacing(1.5),
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: '140%',
      fontSize: theme.spacing(1.5),
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(0.75),
    },
  },
  personInfo: {
    color: theme.palette.info.main,
    [theme.breakpoints.up('sm')]: {
      lineHeight: '150%',
      fontSize: theme.spacing(3),
    },
    [theme.breakpoints.down('sm')]: {
      lineHeight: '140%',
      fontSize: theme.spacing(1.5),
    },
  },
  hr: {
    [theme.breakpoints.up('sm')]: {
      marginRight: theme.spacing(9.75),
      border: `1px solid ${theme.palette.info.main}`,
    },
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(3.5),
      border: `0.5px solid ${theme.palette.info.main}`,
    },
  },
}));

const formater = new Intl.NumberFormat('en-US');
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function Stakeholder({
  info,
  total,
}: {
  info: StakeholderInfo;
  total: number;
}): JSX.Element {
  const classes = useStyles({});

  return (
    <Grid item xs={6}>
      <div className={classes.personName}>{info.personName}</div>
      <hr className={classes.hr} />
      <div className={classes.companyInfo}>
        {info.label}: {info.companyName}
      </div>
      <div className={classes.personInfo}>
        {info.personName}, {info.personRole}
      </div>
    </Grid>
  );
}

export default function Certificate({
  background,
  creditName,
  certificateTitle,
  creditUnitName,
  projectName,
  creditsUnits,
  equivalentTonsCO2,
  buyerName,
  date,
  stakeholders,
  retired = true,
}: CertificateProps): JSX.Element {
  const classes = useStyles({ background });

  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <RegenIcon className={classes.icon} />
        <div className={classes.banner}>
          <div className={classes.bannerSide}>
            <div className={classes.whiteTriangle} />
            <div className={classes.greenTriangle} />
          </div>
          <Title variant="h3" className={classes.bannerContent}>
            Certificate of {certificateTitle}
          </Title>
          <div className={clsx(classes.bannerSideRight, classes.bannerSide)}>
            <div className={classes.whiteTriangle} />
            <div className={classes.greenTriangle} />
          </div>
        </div>
        <div className={classes.text}>
          Credits:{' '}
          <b>
            {formater.format(creditsUnits)}{' '}
            {ReactHtmlParser(
              creditUnitName
                ? pluralize(creditsUnits, creditUnitName)
                : creditName,
            )}
          </b>
          <br />
          Equivalent to:{' '}
          <b>{formater.format(equivalentTonsCO2)} tons of CO2e</b>
          <br />
          Project: <b>{projectName}</b>
          <br />
          Beneficiary: <b>{buyerName}</b>
          <br />
          {retired && (
            <>
              Retirement: <b>Voluntary</b>
              <br />
            </>
          )}
          Date: <b>{new Date(date).toLocaleDateString('en-US', options)}</b>
        </div>
        <Grid container>
          {stakeholders.map((s, i) => (
            <Stakeholder key={i} info={s} total={stakeholders.length} />
          ))}
        </Grid>
      </div>
    </div>
  );
}
