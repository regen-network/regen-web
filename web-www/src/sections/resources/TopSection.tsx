import React, { useState, useEffect } from 'react';
import { useStaticQuery, graphql, StaticQuery } from 'gatsby';
import { useTheme, makeStyles, Theme } from '@material-ui/core';
import BackgroundImage from 'gatsby-background-image';
import Title from 'web-components/lib/components/title';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme: Theme) => ({
  bg: {
	[theme.breakpoints.down('xs')]: {
	  paddingTop: theme.spacing(40),
	  paddingBottom: theme.spacing(20),
	},
	[theme.breakpoints.up('sm')]: {
		paddingTop: theme.spacing(70),
		paddingBottom: theme.spacing(30),
	  },
	color: theme.palette.primary.main,
  },
  backgroundGradient: {
    height: '100%',
    zIndex: -1,
    position: 'absolute',
    bottom: 0,
    width: '100%',
	background: 
		'linear-gradient(194.38deg, rgba(250, 235, 209, 0.8) 11.05%, rgba(125, 201, 191, 0.8) 43.17%, rgba(81, 93, 137, 0.8) 75.29%), linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 25.06%)',
	opacity: 0.8,
	[theme.breakpoints.down('xs')]:{
		background: 'linear-gradient(211.73deg, #FAEBD1 12.63%, #7DC9BF 44.03%, #515D89 75.43%), linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0) 25.06%)',
	}
  },
  text: {
	[theme.breakpoints.down('xs')]: {
		paddingLeft: theme.spacing(5),
		paddingRight: theme.spacing(12),
	},
	[theme.breakpoints.up('sm')]: {
		paddingLeft: '10vw',
		paddingRight: theme.spacing(30),
	},
	maxWidth: theme.spacing(240),
	'& h1': {
		lineHeight: '130%',
		marginBottom: theme.spacing(7.25),
		[theme.breakpoints.down('xs')]: {
			textShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)',
			marginBottom: theme.spacing(3)
		}
	},
	'& p': {
		lineHeight: '160%',
		fontSize: theme.spacing(5.5),
		[theme.breakpoints.down('xs')]: {
			fontSize: theme.spacing(4.5)
		}
	},
  }
}));

const TopSection = (): JSX.Element => {
	const theme = useTheme();
	const classes = useStyles();
  return (
	  <StaticQuery
	  query={graphql`
	  query {
		background: file(relativePath: { eq: "resources-top-image.jpg" }) {
		  childImageSharp {
			fluid(quality: 90) {
			  ...GatsbyImageSharpFluid_withWebp
			}
		  }
		}
		backgroundMobile: file(relativePath: { eq: "resources-top-image-mobile.jpg" }) {
			childImageSharp {
			  fluid(quality: 90) {
				...GatsbyImageSharpFluid_withWebp
			  }
			}
		  }
	  }
	`}
	  render={data => {

		return (
			<>
			<Box display={{xs: 'none', sm: 'block'}}>
				<BackgroundImage
				Tag="section"
				className={classes.bg}
				fluid={data.background.childImageSharp.fluid}
				backgroundColor={`#040e18`}>
					<div className={classes.backgroundGradient} />
					<div className={classes.text}>
						<Title color={theme.palette.primary.main} variant="h1">Dig into our documentation.</Title>
						<Typography>We strive to be a transparent and open system for creating ecological credits that reward regenerative practices. Learn more about the ins and outs of how the Regen Ledger and Regen Registry function.</Typography>
					</div>
				</BackgroundImage>
			</Box>
			<Box display={{xs: 'block', sm: 'none'}}>
				<BackgroundImage
				Tag="section"
				className={classes.bg}
				fluid={data.backgroundMobile.childImageSharp.fluid}
				backgroundColor={`#040e18`}>
					<div className={classes.backgroundGradient} />
					<div className={classes.text}>
						<Title color={theme.palette.primary.main} variant="h1">Dig into our documentation.</Title>
						<Typography>We strive to be a transparent and open system for creating ecological credits that reward regenerative practices. Learn more about the ins and outs of how the Regen Ledger and Regen Registry function.</Typography>
					</div>
				</BackgroundImage>
			</Box>
		</>
		)
	  	}
	  }
	/>
  );
};

export default TopSection;
