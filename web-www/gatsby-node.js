/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);

// You can delete this file if you're not using it
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: 'eval-source-map',
  });
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const faqResult = await graphql(`
    query {
      faqYaml {
        categories {
          header
        }
      }
    }
  `);
  faqResult.data.faqYaml.categories.forEach(item => {
    createPage({
      path: `faq/${item.header}`,
      component: path.resolve(`./src/templates/Faq.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables
        // and in this.props.pageContext.
        header: item.header,
      },
    });
  });

  // Case studies
  const result = await graphql(`
    query {
      allCaseStudyItemsYaml {
        nodes {
          slug
        }
      }
    }
  `);
  result.data.allCaseStudyItemsYaml.nodes.forEach(item => {
    createPage({
      path: `case-studies/${item.slug}`,
      component: path.resolve(`./src/templates/CaseStudy.tsx`),
      context: {
        slug: item.slug,
      },
    });
  });
};
