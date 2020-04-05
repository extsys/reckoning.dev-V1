import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing';
import SimpleListing from '../components/SimpleListing';
import Subscription from '../components/Subscription';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import publications from '../../data/publications';
import sadanand from '../../content/images/sadanand.jpg';
import GitHubButton from 'react-github-btn';
import { Follow } from 'react-twitter-widgets';

class Index extends Component {
  render() {
    const latestPostEdges = this.props.data.latest.edges;
    const published = publications.filter((article, i) => i < 6);

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Introduction`} />
        <SEO />

        <section className='hero'>
          <div className='author'>
            <img alt='Author image' className='author__image' src={sadanand} />

            <h1 className='author__site-title'>Notes on AI, Health Care and Computers!</h1>

            <p className='author__intro'>
              Views of an AI Researcher in health care. Discussions, tutorials, and commentary on
              deep learning, machine learning, programming, computers and science.
            </p>

            <div className='author__links'>
              <GitHubButton
                href='https://github.com/sadanand-singh'
                data-size='large'
                aria-label='Follow @sadanand-singh on GitHub'
              >
                GitHub
              </GitHubButton>
              &nbsp;&nbsp;&nbsp;
              <Follow
                username={`${config.userTwitter}`}
                options={{ size: 'large', showCount: false }}
              />
            </div>
          </div>
        </section>

        <div className='container front-page'>
          <section className='section'>
            <h2>
              Recent Articles{' '}
              <Link to='/blog' className='view-all'>
                View all
              </Link>{' '}
            </h2>
            <PostListing simple postEdges={latestPostEdges} />
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
        <Subscription />
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
