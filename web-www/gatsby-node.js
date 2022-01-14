/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const faqResult = await graphql(`
    query {
      sanityFaqPage {
        categories {
          header
        }
      }
    }
  `);
  faqResult.data.sanityFaqPage.categories.forEach(item => {
    createPage({
      path: `faq/${item.header.toLowerCase()}`,
      component: path.resolve(`./src/templates/Faq.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables
        // and in this.props.pageContext.
        header: item.header.toLowerCase(),
      },
    });
  });

  // Case studies
  const caseStudyResult = await graphql(`
    query {
      allSanityCaseStudyPage {
        nodes {
          slug {
            current
          }
        }
      }
    }
  `);

  caseStudyResult.data.allSanityCaseStudyPage.nodes.forEach(item => {
    createPage({
      path: `case-studies/${item.slug.current}`,
      component: path.resolve(`./src/templates/CaseStudy.tsx`),
      context: {
        slug: item.slug.current,
      },
    });
  });
};
