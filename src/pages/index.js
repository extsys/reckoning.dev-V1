import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing';
import SimpleListing from '../components/SimpleListing';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import publications from '../../data/publications';
import sadanand from '../../content/images/sadanand.jpg';
import GitHubButton from 'react-github-btn';
import { Follow } from 'react-twitter-widgets';

class Index extends Component {
  render() {
    const latestPostEdges = this.props.data.latest.edges;
    const popularPostEdges = this.props.data.popular.edges;
    const published = publications.filter((article, i) => i < 6);

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Introduction`} />
        <SEO />

        <div class='author'>
          <img alt='Author image' class='author__image' src={sadanand} />

          <h1 class='author__site-title'>My Notes on AI, Programming and Food!</h1>

          <p class='author__intro'>
            Views and notes of an AI Researcher in medical imaging. Discussions, tutorials, and
            commentary on machine learning, programming, science and food.
          </p>

          <p class='author__links'>
            <GitHubButton
              href='https://github.com/sadanand-singh'
              data-size='large'
              aria-label='Follow @sadanand-singh on GitHub'
            >
              GitHub
            </GitHubButton>
            &nbsp;&nbsp;&nbsp;
            <Follow username={`${config.userTwitter}`} options={{ size: 'large' }} />
          </p>
        </div>

        <div className='container'>
          <section className='section'>
            <h2>Latest Articles</h2>
            <PostListing simple postEdges={latestPostEdges} />
          </section>

          <section className='section'>
            <h2>Most Popular</h2>
            <PostListing simple postEdges={popularPostEdges} />
          </section>

          <section className='section'>
            <h2>
              Publications{' '}
              <Link className='view-all' to='/publications'>
                View all
              </Link>
            </h2>
            <SimpleListing simple data={published} />
          </section>
        </div>
        {/* <UserInfo config={config} /> */}
      </Layout>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMdx(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { template: { eq: "post" } }, fields: { draft: { eq: false } } }
    ) {
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
                fixed(width: 150, height: 150) {
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
    popular: allMdx(
      limit: 6
      sort: { fields: [fields___date], order: DESC }
      filter: { frontmatter: { categories: { eq: "Popular" } }, fields: { draft: { eq: false } } }
    ) {
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
                fixed(width: 150, height: 150) {
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
