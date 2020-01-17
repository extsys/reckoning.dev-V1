import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Subscription from '../components/Subscription';
import PostListing from '../components/PostListing';
import config from '../../data/SiteConfig';

class TagTemplate extends Component {
  render() {
    const { tag } = this.props.pageContext;
    const postEdges = this.props.data.allMdx.edges;

    return (
      <Layout>
        <Helmet title={`Posts tagged as "${tag}" – ${config.siteTitle}`} />
        <div className='container'>
          <h1>Posts tagged as "{tag}"</h1>
          <PostListing postEdges={postEdges} />
        </div>
        <Subscription />
      </Layout>
    );
  }
}

export default TagTemplate;

export const pageQuery = graphql`
  query TagPage($tag: String) {
    allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: { fields: { draft: { eq: false } }, frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            categories
            thumbnail {
              childImageSharp {
                fixed(width: 96, height: 96) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            date
            template
          }
        }
      }
    }
  }
`;
