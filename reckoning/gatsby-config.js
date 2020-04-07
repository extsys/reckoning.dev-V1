require("dotenv").config();

const siteMetadata = {
  title: `reckoning.dev`,
  name: `reckoning.dev`,
  siteUrl: `https://reckoning.dev/`,
  description: `Sadanand is a scientist, programmer, engineer, and writer who loves explaining complex concepts in simple words to people of all skill levels.`,
  hero: {
    heading: `Welcome to my blog for notes on AI in healthcare, Programming, Linux and Food!`,
    maxWidth: 1052,
  },
  social: [
    {
      url: `https://twitter.com/reckoningdev`,
    },
    {
      url: `https://github.com/sadanand-singh`,
    },
    {
      url: `https://www.linkedin.com/in/sadanandsingh/`,
    },
    {
      name: 'stackoverflow',
      url: `https://stackoverflow.com/users/13244305/reckoningdev`,
    },
    {
      url: `https://www.facebook.com/sadanand4singh`,
    }
  ],
};

const plugins = [
  {
    resolve: "@narative/gatsby-theme-novela",
    options: {
      contentPosts: "content/posts",
      contentAuthors: "content/authors",
      rootPath: "/",
      basePath: "/",
      authorsPage: true,
      mailchimp: true,
      tags: true,
      sources: {
        local: true,
        contentful: false,
      },
    },
  },
  {
    resolve: 'gatsby-source-filesystem',
    options: {
      name: 'assets',
      path: `${__dirname}/static/`
    }
  },
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `reckoning.dev`,
      short_name: `reckoning`,
      start_url: `/`,
      background_color: `#fff`,
      theme_color: `#fff`,
      display: `standalone`,
      icon: `src/assets/favicon.png`,
    },
  },
  {
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: "UA-54080172-1",
    },
  }
];

module.exports = {
  siteMetadata,
  plugins,
};
