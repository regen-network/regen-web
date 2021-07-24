import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';

import Title from 'web-components/lib/components/title';

import { PeerReviewed, NavLink } from '../atoms';

const useStyles = makeStyles(theme => ({
  label: {
    fontSize: '14px',
    letterSpacing: '1px',
    lineHeight: theme.typography.pxToRem(17.57),
    fontWeight: 800,
    color: theme.palette.info.dark,
    textTransform: 'uppercase',
  },
}));

type DropdownItemWithIconProps = {
  title: string;
  to: string;
  svg: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  isPeerReviewed?: boolean;
};

const DropdownItemWithIcon: React.FC<DropdownItemWithIconProps> = ({
  svg: SVG,
  isPeerReviewed = false,
  ...props
}) => {
  const styles = useStyles();
  return (
    <>
      <Grid container wrap="nowrap" justify="center" alignItems="center">
        <SVG />
        <Box mx={3}>
          <NavLink to={props.to}>{ReactHtmlParser(props.title)}</NavLink>
        </Box>
        {isPeerReviewed && <PeerReviewed />}
      </Grid>
    </>
  );
};

const DropdownPadding: React.FC = ({ children }) => (
  <Box px={8} py={4}>
    {children}
  </Box>
);

const NavColumn: React.FC<{ title: string }> = props => {
  const styles = useStyles();
  return (
    <Box display="flex" flexDirection="column">
      <Title variant="h4" className={styles.label}>
        {ReactHtmlParser(props.title)}
      </Title>
      {props.children}
    </Box>
  );
};

/** column with a title and links */
const NavLinkColumn: React.FC<{ colTitle: string; links: InternalLink[] }> = props => {
  return (
    <NavColumn title={props.colTitle}>
      <Box mt={2}>
        {props.links.map((link, i) => (
          <div key={i}>
            <NavLink to={link.to}>{link.title}</NavLink>
          </div>
        ))}
      </Box>
    </NavColumn>
  );
};

export const CreditClassDropdown: React.FC<{ carbonPlusCredits: DropdownItemWithIconProps[] }> = ({
  ...props
}) => {
  return (
    // <DropdownPadding>
    <NavColumn title="Carbon<i>Plus</i> Credits">
      <Box mt={2}>
        {props.carbonPlusCredits.map((item, i) => (
          <Box key={i} py={2}>
            <DropdownItemWithIcon {...item} />
          </Box>
        ))}
      </Box>
    </NavColumn>
    // </DropdownPadding>
  );
};

export const MethodologyDropdown: React.FC<{ methodologies: DropdownItemWithIconProps[] }> = ({
  methodologies,
}) => {
  return (
    // <DropdownPadding>
    <Grid container wrap="nowrap" justify="center" alignItems="center">
      {methodologies.map((item, i) => (
        <Box key={i}>
          <DropdownItemWithIcon {...item} />
        </Box>
      ))}
    </Grid>
    // </DropdownPadding>
  );
};

type InternalLink = { to: string; title: string };

export const ProgramDropdown: React.FC<{
  standardLinks: InternalLink[];
  howToLinks: InternalLink[];
}> = props => {
  return (
    // <DropdownPadding>
    <Box display="flex" justifyContent="space-between">
      <Box pr={20}>
        <NavLinkColumn colTitle="Standard" links={props.standardLinks} />
      </Box>
      <Box display="flex" flexDirection="column">
        <NavLinkColumn colTitle="How Tos" links={props.howToLinks} />
      </Box>
    </Box>
    // </DropdownPadding>
  );
};
