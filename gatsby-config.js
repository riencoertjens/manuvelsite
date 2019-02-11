require('dotenv').config()
const config = require(`./src/site/config.js`)

module.exports = {
  siteMetadata: config.siteMetadata,
  plugins: [
    // source
    {
      //https://graph.facebook.com/v3.2/10218557873676892/accounts?fields=fields=name,id,access_token,instagram_business_account{id,username,profile_picture_url}&access_token=EAAIKRN12OeMBAJZAZCMBO1ZAZA9ZBu5ommf0HXU9cTzNikhEPqublMV9vfv6WXotkWLfCT66XopdzVuIsA0G3OipUkLgR3eIHxpaVS6owDFVKtZBzKKZCOgOiTbZAxY1sZBTPH6FoRGGhQzq7DrRgLjs9iZBtbDZAeiAlIZD
      resolve: `gatsby-source-instagram`,
      options: {
        username: `rien_coertjens`,
        access_token:
          'EAAIKRN12OeMBABhHLlnsNtjcBuZC0spdFca2SoUqjAHyPLX9Cck43OZB6QzStOol1WaeAcZBdBo9KdziZCQAg8pmUEdVuoE17BmxjCc69mZCLeiL4bWdvcwZArCUc6AgHKA9VawHFC7i8UnZCzwJ9oayIykZCHRhCZATPJZCT8AScVmAZDZD',
        instagram_id: '17841400765150032',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `icons`,
        path: `${__dirname}/static/netlify-uploads`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/content`,
        name: 'content',
      },
    },

    // transform
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-remark-relative-images`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1800,
            },
          },
          `gatsby-remark-embed-video`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
          `gatsby-remark-responsive-iframe`,
        ],
      },
    },
    'gatsby-transformer-json',
    `gatsby-transformer-sharp`,

    // build
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-emotion`,
      options: {
        // Accepts all options defined by `babel-plugin-emotion` plugin.
      },
    },
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/site/typography`,
        omitGoogleFont: true,
      },
    },

    // optimize
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `${process.env.GA_CODE}`,
        head: true, // Puts tracking script in the head instead of the body
        anonymize: true, // Setting this parameter is optional
        respectDNT: true, // Setting this parameter is also optional
        exclude: [], // Avoids sending pageview hits from custom paths
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ['/404', '/bericht-verzonden', '/admin'],
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `${config.siteMetadata.siteUrl}`,
        sitemap: `${config.siteMetadata.siteUrl}/sitemap.xml`,
        policy: [
          {
            userAgent: '*',
            disallow: ['/404', '/bericht-verzonden', '/admin'],
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: config.manifest,
    },
    {
      resolve: 'gatsby-plugin-svgr',
      // options: {
      //   include: `./src/images/icons`,
      // },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    'gatsby-plugin-offline',
    // {
    //   resolve: 'gatsby-plugin-netlify-cms',
    //   options: {
    //     modulePath: `${__dirname}/src/cms/cms.js`,
    //   },
    // },
    {
      resolve: 'gatsby-plugin-netlify', //keep last
      options: {
        headers: {
          '/sw.js': ['Cache-Control: no-cache'], //dont cache the service worker!
        },
        // mergeSecurityHeaders: false,
      },
    },
  ],
}
