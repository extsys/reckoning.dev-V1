import React, { Component } from 'react';
// import ThemeContext from '../context/ThemeContext';
import Helmet from 'react-helmet';
import Layout from '../layout';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import NotFound from '../utils/notFound';

class NotFoundPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Page not found – ${config.siteTitle}`} />
        <SEO />
        <div className='container'>
          <article>
            <NotFound />
          </article>
        </div>
      </Layout>
    );
  }
}

export default NotFoundPage;
