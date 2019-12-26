const urljoin = require('url-join');
const config = require('./data/SiteConfig');

module.exports = {
  pathPrefix: config.pathPrefix === '' ? '/' : config.pathPrefix,
  siteMetadata: {
    siteUrl: urljoin(config.siteUrl, config.pathPrefix),
    rssMetadata: {
      site_url: urljoin(config.siteUrl, config.pathPrefix),
      feed_url: urljoin(config.siteUrl, config.pathPrefix, config.siteRss),
      title: config.siteTitle,
      description: config.siteDescription,
      image_url: `${urljoin(config.siteUrl, config.pathPrefix)}/logos/logo-512.png`
    }
  },
  plugins: [
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-twitter',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'assets',
        path: `${__dirname}/static/`
      }
    },
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: `${__dirname}/src/utils/typography.js`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/`
      }
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 850,
              linkImagesToOriginal: false,
              quality: 80,
              withWebp: true
            }
          },
          `gatsby-remark-images-medium-zoom`,
          'gatsby-remark-prismjs',
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          {
            resolve: `gatsby-remark-katex`,
            options: {
              // Add any KaTeX options from https://github.com/KaTeX/KaTeX/blob/master/docs/options.md here
              strict: `ignore`,
              delimiters: [
                {
                  left: '\\\\begin{equation*}',
                  right: '\\\\end{equation*}',
                  display: true
                },
                { left: '$$', right: '$$', display: true },
                { left: '\\[', right: '\\]', display: true },
                { left: '$', right: '$', display: false },
                { left: '\\(', right: '\\)', display: false }
              ]
            }
          },
          {
            resolve: `gatsby-remark-copy-linked-files`
          },

          {
            resolve: `gatsby-remark-smartypants`
          }
        ],
        plugins: [`gatsby-remark-images`, `gatsby-remark-images-medium-zoom`]
      }
    },
    { resolve: `gatsby-plugin-typescript` },
    {
      resolve: `gatsby-plugin-styled-components`
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: config.googleAnalyticsID
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.themeColor
      }
    },
    'gatsby-plugin-sharp',
    `gatsby-transformer-sharp`,
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.siteTitleShort,
        description: config.siteDescription,
        start_url: config.pathPrefix,
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icons: [
          {
            src: '/logos/logo-48.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: '/logos/logo-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Poppins`,
            variants: [`300`, `400`, `500`, `600`, `700`]
          },
          {
            family: `Fira Sans`,
            variants: [`100`, `300`, `400`, `500`, `600`, `700`]
          }
        ]
      }
    }
  ]
};
