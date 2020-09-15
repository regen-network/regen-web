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
  const result = await graphql(`
    query {
      allCaseStudyItemsYaml {
        nodes {
          name
          description
          slug
          cardImage {
            publicURL
          }
        }
      }
    }
  `);
  result.data.allCaseStudyItemsYaml.nodes.forEach(item => {
    createPage({
      path: `case-studies/${item.slug}`,
      component: path.resolve(`./src/templates/CaseStudy.tsx`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: item.slug,
      },
    });
  });
};
