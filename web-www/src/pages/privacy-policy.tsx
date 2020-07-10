import React from 'react';
import SEO from '../components/seo';
import { useStaticQuery, graphql } from 'gatsby';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme:Theme) => ({
	section: {
		padding: theme.spacing(50),
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
			<div className={classes.section} dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
		</>
)};

export default PrivacyPolicy