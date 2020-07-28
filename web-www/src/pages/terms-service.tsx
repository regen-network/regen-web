import React from 'react';
import SEO from '../components/seo';
import { useStaticQuery, graphql } from 'gatsby';
import MarkdownSection from '../components/MarkdownSection';

const TermsService = (): JSX.Element => {
	const data = useStaticQuery(graphql`
	query {
		markdownRemark(fileAbsolutePath: {regex: "/^.*/terms-service.md$/"}) {
			html
		}
	}`);	
	return (
		<>
		<SEO title="Terms of Service"/>
		<MarkdownSection title="Terms of Service" mdContent={data.markdownRemark.html} />
		</>
)};

export default TermsService