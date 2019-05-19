import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import PostListing from '../components/PostListing';
import ProjectListing from '../components/ProjectListing';
import SimpleListing from '../components/SimpleListing';
import NewsletterForm from '../components/NewsletterForm';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import projects from '../../data/projects';
import publications from '../../data/publications';

class Index extends Component {
  render() {
    const latestPostEdges = this.props.data.latest.edges;
    const popularPostEdges = this.props.data.popular.edges;
    const published = publications.filter((article, i) => i < 6);

    return (
      <Layout>
        <Helmet title={`${config.siteTitle} – Introduction`} />
        <SEO />
        <div className='container'>
          <div className='lead'>
            <h1>Hi, I'm Sadanand Singh.</h1>
            <h4>
              I am a <strong className='pink'>Deep Learning Researcher</strong> in medical imaging
              and enjoy playing with <strong className='pink'>Algorithms</strong>!
            </h4>
            <p>
              I created this site to document everything I learn, and share a bit of myself with
              the world. My site is <strong>free</strong> and has no ads, affiliate links, or
              sponsored posts.
            </p>
            <div className='quotation-main'>
              Learn from yesterday, live for today, hope for tomorrow. The important thing is not
              to stop questioning.
            </div>
            <div className='quotation-footer'>— Albert Einstein</div>

            <a
              className='twitter-follow-button'
              href='https://twitter.com/sadanandsingh'
              data-size='large'
              data-show-screen-name='false'
            >
              Follow @sadannadsingh
            </a>
          </div>
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
            <h2>Open Source Projects</h2>
            <ProjectListing projects={projects} />
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

          <section className='section'>
            <h2>Other People's Opinions</h2>
            <blockquote className='quotation'>
              <p>
                "Hi Sadanand, Excellent post. Thank you for taking time and explaining in a neat
                matter. I am bit confused in here. In classification problem we have total 3
                classes, so by default SVM takes care and divide it into 3 classes ? And also it is
                mentioned that "SVM by definition is well suited for binary classification. In
                order to perform multi-class classification, the problem needs to be transformed
                into a set of binary classification problems."
              </p>
              <cite>— KK</cite>
            </blockquote>
            <blockquote className='quotation'>
              <p>
                "Great write up. I implemented much of this on an Up-Squared
                (http://www.up-board.org/ups...). It runs great. Not a lot of wasted CPU cycles,
                other than conky. I am liking Plasma and Arch."
              </p>
              <cite>— Vincent Flesouras</cite>
            </blockquote>
            <blockquote className='quotation'>
              <p>"Great article, very useful thank you!"</p>
              <cite>— Fivos Delemis</cite>
            </blockquote>
          </section>

          <section className='section'>
            <h2>Newsletter</h2>
            <p>Sign up to get notified about new content.</p>
            <NewsletterForm />
          </section>
        </div>
      </Layout>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query IndexQuery {
    latest: allMarkdownRemark(
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
    popular: allMarkdownRemark(
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
