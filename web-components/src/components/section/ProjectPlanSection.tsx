import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';

import Section, { SectionProps } from './index';

interface ProjectPlanSectionProps extends SectionProps {
  linkText?: string;
  onLinkClick?: () => void;
  title: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.grey[200],
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(12.5),
      paddingBottom: theme.spacing(30),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(7.5, 2.75, 20),
    },
  },
  title: {
    [theme.breakpoints.up('sm')]: {
      margin: '0 auto',
      maxWidth: theme.spacing(140),
    },
  },
  content: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing(140),
      margin: '0 auto',
    },
  },
  link: {
    color: theme.palette.secondary.main,
    fontFamily: theme.typography.fontFamily,
    fontWeight: 'bold',
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.spacing(4.5),
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: theme.spacing(3.5),
    },
  },
}));

const ProjectPlanSection: React.FC<ProjectPlanSectionProps> = ({
  title,
  children,
  linkText,
  onLinkClick,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Section
      className={classes.root}
      title={title}
      titleAlign="left"
      titleVariant="h3"
      titleClassName={classes.title}
      topRight={
        onLinkClick && (
          <Link className={classes.link} onClick={onLinkClick}>
            {linkText}
          </Link>
        )
      }
      {...props}
    >
      <div className={classes.content}>{children}</div>
    </Section>
  );
};

export default ProjectPlanSection;
