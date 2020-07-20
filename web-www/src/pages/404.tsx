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
		width: theme.spacing(132.75),
		margin: '0 auto',
		paddingTop: theme.spacing(41.5),
	},
	image: {
		width: theme.spacing(77),
		margin: '0 auto',
		marginBottom: theme.spacing(6.25),
		left: `-${theme.spacing(1.5)}`,
	},
	fourOFour: {
		'font-family': 'Muli',
		'font-style': 'normal',
		'font-weight': 900,
		'font-size': theme.spacing(50),
		'line-height': theme.spacing(42.75),
		'text-align': 'center',
		'letter-spacing': theme.spacing(1),
		'text-transform': 'uppercase',
		width: '80%',
		margin: '0 auto',
		color: theme.palette.secondary.dark,
		marginBottom: theme.spacing(8),
	},
	h2: {
		'font-weight': 900,
		'font-size': theme.spacing(12),
		'line-height': '130%',
		color: theme.palette.primary.contrastText,
		marginBottom: theme.spacing(4.25),
	},
	text: {
		width: theme.spacing(120),
		lineHeight: '150%',
		fontSize: theme.spacing(4.5),
		margin: '0 auto',
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
			<Title className={classes.h2} align="center" variant="h2">Oops! Page not found.</Title>
			<Typography align="center" className={classes.text}>The page you are looking for might have been temporarily removed or had its name changed.</Typography>
			<ContainedButton className={classes.button}>Visit Our Homepage Instead</ContainedButton>
		</div>
		</>
	)
}

export default NotFoundPage;
