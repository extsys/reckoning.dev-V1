const config = {
  siteTitle: "Sadanand's Notes",
  siteTitleShort: 'Sadanand Singh',
  siteTitleAlt: 'Sadanand Singh',
  siteLogo: '/logos/logo-512.png',
  siteUrl: 'https://datasciencevision.com/',
  repo: 'https://github.com/sadanand-singh/datasciencevision.com',
  pathPrefix: '',
  dateFromFormat: 'YYYY-MM-DD',
  dateFormat: 'MMMM Do, YYYY',
  disqusName: 'sadanandsingh',
  siteDescription:
    'Sadanand is a scientist, programmer, engineer, and writer who loves explaining complex concepts in simple words to people of all skill levels.',
  siteRss: '/rss.xml',
  googleAnalyticsID: 'UA-54080172-1',
  postDefaultCategoryID: 'Tech',
  userName: 'Tania',
  userEmail: 'me@datasciencevision.com',
  userTwitter: 'sadanandsingh',
  userLocation: 'San Francisco, CA',
  userAvatar: 'https://api.adorable.io/avatars/285/@sadanandsingh.png',
  userDescription:
    'I build mathematical models of different things: materials, radiology, semiconductor manufacturing...',
  menuLinks: [
    {
      name: 'About Me',
      link: '/me/'
    },
    {
      name: 'Articles',
      link: '/blog/'
    },
    {
      name: 'Contact',
      link: '/contact/'
    }
  ],
  themeColor: '#3F80FF', // Used for setting manifest and progress theme colors.
  backgroundColor: '#ffffff'
};

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === '/') {
  config.pathPrefix = '';
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, '')}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === '/') config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== '/') config.siteRss = `/${config.siteRss}`;

module.exports = config;
