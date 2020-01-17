import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Layout from '../layout';
import SimpleListing from '../components/SimpleListing';
import Subscription from '../components/Subscription';
import config from '../../data/SiteConfig';
import publications from '../../data/publications';

class PublicationsPage extends Component {
  render() {
    return (
      <Layout>
        <Helmet title={`Publications – ${config.siteTitle}`} />
        <div className='container'>
          <h1>Publications</h1>
          <SimpleListing data={publications} />
        </div>
        <Subscription />
      </Layout>
    );
  }
}

export default PublicationsPage;
