import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import Subscription from '../components/Subscription';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';

class PageTemplate extends Component {
  render() {
    const { slug } = this.props.pageContext;
    const postNode = this.props.data.mdx;
    const page = postNode.frontmatter;
    const title = page.title ? page.title : `About Me`;

    if (!page.id) {
      page.id = slug;
    }

    return (
      <Layout>
        <Helmet>
          <title>{`${title} – ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <div className='container'>
          <article>
            <header className='page-header'>
              <h1>{page.title}</h1>
            </header>
            <div className='page'>
              <MDXRenderer>{postNode.body}</MDXRenderer>
            </div>
          </article>
        </div>
        <Subscription />
      </Layout>
    );
  }
}

export default PageTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      body
      timeToRead
      excerpt
      frontmatter {
        title
        template
      }
      fields {
        slug
        date
      }
    }
  }
`;
