import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby-image';
import { makeStyles, useTheme, Theme } from '@material-ui/core';
import SEO from '../components/seo';
import Title from 'web-components/lib/components/title';
import Typography from '@material-ui/core/Typography';
import ContainedButton from 'web-components/lib/components/buttons/ContainedButton';

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		textAlign: 'center',
		height: '100%',
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(44.5),
			paddingLeft: theme.spacing(30),
			paddingRight: theme.spacing(30),
		},
		[theme.breakpoints.up(theme.breakpoints.values['tablet'])]: {
			paddingTop: theme.spacing(44.5),
			paddingLeft: 'unset',
			paddingRight: 'unset',
			width: theme.spacing(132.75),
			margin: '0 auto',
		},
		[theme.breakpoints.down('xs')]: {
			paddingTop: theme.spacing(11),
			paddingLeft: theme.spacing(5),
			paddingRight: theme.spacing(5),
		},
	},
	image: {
		width: '70%',
		[theme.breakpoints.up('sm')]:{
			marginBottom: theme.spacing(6.25),
		},
		[theme.breakpoints.down('xs')]:{
			marginBottom: theme.spacing(2),
		},
		margin: '0 auto',
		left: `-${theme.spacing(1.5)}`,
	},
	fourOFour: {
		fontFamily: theme.typography.h1.fontFamily,
		fontStyle: 'normal',
		fontWeight: 900,
		[theme.breakpoints.up('sm')]:{
			fontSize: theme.spacing(48),
			lineHeight: theme.spacing(42.75),
			marginBottom: theme.spacing(8),
		},
		[theme.breakpoints.down('xs')]:{
			fontSize: theme.spacing(36),
			lineHeight: theme.spacing(30.75),
			marginBottom: theme.spacing(2),
		},
		
		textAlign: 'center',
		letterSpacing: theme.spacing(1),
		textTransform: 'uppercase',
		color: theme.palette.secondary.dark,
		
	},
	h1: {
		fontWeight: 900,
		lineHeight: '130%',
		color: theme.palette.primary.contrastText,
		marginBottom: theme.spacing(4.25),
	},
	text: {
		lineHeight: '150%',
		fontSize: theme.spacing(4.5),
		marginBottom: theme.spacing(6.5),
	},
	button: {
		textTransform: 'uppercase',
		height: theme.spacing(15),
		lineHeight: theme.spacing(5.75),
		[theme.breakpoints.down('xs')]: {
			padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
			fontSize: theme.spacing(4.5),
		  },
		  [theme.breakpoints.up('sm')]: {
			padding: `${theme.spacing(2)} ${theme.spacing(6)}`,
			fontSize: theme.spacing(4.5),
		  },
	}
}))

const NotFoundPage = (): JSX.Element => {
	const classes = useStyles();
	const data = useStaticQuery(graphql`
	query {
		grazing: file(relativePath: { eq: "rotational-grazing.png" }) {
		  childImageSharp {
			fluid(quality: 90) {
			  ...GatsbyImageSharpFluid_withWebp
			}
		  }
		}
	}`);

	return (
		<>
		<SEO title="404: Not found" />
		<div className={classes.root}>

			<Img fluid={data.grazing.childImageSharp.fluid} className={classes.image} />
			<div className={classes.fourOFour}>404</div>
			<Title className={classes.h1} align="center" variant="h1">Oops! Page not found.</Title>
			<Typography align="center" className={classes.text}>The page you are looking for might have been temporarily removed or had its name changed.</Typography>
			<ContainedButton className={classes.button}>Visit Our Homepage Instead</ContainedButton>
		</div>
		</>
	)
}

export default NotFoundPage;
