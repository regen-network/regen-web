import React from 'react';
import SEO from '../components/seo';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';
import Title from 'web-components/lib/components/title';
import clsx from 'clsx';

const useStyles = makeStyles((theme:Theme) => ({
	sectionPadding: {
		[theme.breakpoints.up('sm')]:{
			paddingLeft: theme.spacing(37.5),
			paddingRight: theme.spacing(38.25),
		},
		[theme.breakpoints.down('xs')]:{
			paddingLeft: theme.spacing(2.8),
			paddingRight: theme.spacing(2.8),
		},
	},
	title: {
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.spacing(48.75),
			marginBottom: theme.spacing(11.25)
		},
		[theme.breakpoints.down('xs')]: {
			paddingTop: theme.spacing(18.25),
			marginBottom: theme.spacing(12.75)
		},
		
	},
	text: {
		fontSize: theme.spacing(4.5),
		lineHeight: '150%',
		color: theme.palette.info.dark,
		'& h2': {
			color: theme.palette.primary.contrastText,
			marginTop: theme.spacing(15),
			marginBottom: theme.spacing(10.5),
		},
		'& h4': {
			marginBottom: theme.spacing(7.25),
			marginTop: theme.spacing(10.5),
			color: theme.palette.primary.contrastText,
			fontSize: theme.spacing(4.7),
			textTransform: 'uppercase',
			letterSpacing: theme.spacing(0.20)
		}


	}
}))

const PrivacyPolicy = (): JSX.Element => {
	const classes = useStyles()
	const data = useStaticQuery(graphql`
	query {
		markdownRemark(fileAbsolutePath: {regex: "/^.*/privacy-policy.md$/"}) {
			html
		}
	}`);	
	return (
		
		<>
			<SEO title="Privacy Policy"/>
			<Title className={clsx(classes.title, classes.sectionPadding)} variant="h1">Privacy Policy</Title>
			<div className={clsx(classes.sectionPadding, classes.text)} dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
		</>
)};

export default PrivacyPolicy