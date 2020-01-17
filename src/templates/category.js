import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../layout';
import Subscription from '../components/Subscription';
import PostListing from '../components/PostListing';
import config from '../../data/SiteConfig';

class CategoryTemplate extends Component {
  render() {
    const { category } = this.props.pageContext;
    const postEdges = this.props.data.allMdx.edges;

    return (
      <Layout>
        <Helmet title={`Posts in category "${category}" – ${config.siteTitle}`} />
        <div className='container'>
          <h1>{category}</h1>
          <PostListing postEdges={postEdges} />
        </div>
        <Subscription />
      </Layout>
    );
  }
}

export default CategoryTemplate;

export const pageQuery = graphql`
  query CategoryPage($category: String) {
    allMdx(
      limit: 1000
      sort: { fields: [fields___date], order: DESC }
      filter: {
        fields: { draft: { eq: false } }
        frontmatter: { categories: { in: [$category] } }
      }
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
