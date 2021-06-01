module.exports = {
  siteMetadata: {
    title: `Regen Network`,
    description: `Buy and sell ecosystem service credits at the open marketplace for climate solutions.`,
    author: `Regen Network`,
    siteUrl: 'https://www.regen.network/',
  },
  plugins: [
    'gatsby-plugin-layout',
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          '/wallet-address-registration': ['Basic-Auth: regen:carboncanopy'],
          '/token': ['Basic-Auth: regen:cicada'], //TODO: delete this line when ready to go live
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics-gdpr`,
      options: {
        trackingId: 'UA-119338253-2',
        enableDevelopment: true, // default false
        anonymizeIP: true,
        autoStartWithCookiesEnabled: false,
        // Optional parameter - Configuration for react-ga and google analytics
        reactGaOptions: {
          debug: true,
          gaOptions: {
            sampleRate: 10,
          },
        },
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        additionalSitemaps: [
          {
            name: `registry`,
            url: `/registry/sitemap.xml`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-background-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/static/media`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        // Plugins configs
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `md`,
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `static/media/regen-favicon.svg`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-yaml-plus`,
      options: {
        enableRemark: true,
        markdownPreface: 'md//',
        name: `content`,
        path: `${__dirname}/content/`,
      },
    },
    `gatsby-plugin-netlify-cms`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
