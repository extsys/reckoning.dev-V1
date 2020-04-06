import React, { Component } from 'react';

import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from  "@components/Layout"
import NotFound from '../utils/notFound';

class NotFoundPage extends Component {
  render() {
    return (
      <Layout>
        <SEO />
        <Section narrow>
            <NotFound />
        </Section>
      </Layout>
    );
  }
}

export default NotFoundPage;