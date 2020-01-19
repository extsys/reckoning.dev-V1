import React, { Component } from 'react';
import { MDXProvider } from '@mdx-js/react';
import ZoomImage from '../components/ZoomImage.js';
import ImageGallery from 'react-image-gallery';
import urljoin from 'url-join';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import Subscription from '../components/Subscription';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import PostTags from '../components/PostTags';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import SimilarPosts from '../components/SimilarPosts';
import Img from 'gatsby-image';
import HighlightShare from '../components/HighlightShare/HighlightShare';
import { formatDate, editOnGithub } from '../utils/global';
import { preToCodeBlock } from 'mdx-utils';
import Code from '../components/Code';
import 'katex/dist/katex.min.css';
import {
  FacebookShareButton,
  TwitterShareButton,
  RedditShareButton,
  LinkedinShareButton
} from 'react-share';
import { IoLogoFacebook, IoLogoTwitter, IoLogoReddit, IoLogoLinkedin } from 'react-icons/io';
import { BlogPostFooter, PostShare } from './templates.style';

const shortcodes = {
  ZoomImage,
  ImageGallery,
  pre: preProps => {
    const props = preToCodeBlock(preProps);
    // if there's a codeString and some props, we passed the test
    if (props) {
      return <Code {...props} />;
    }
    // it's possible to have a pre without a code in it
    return <pre {...preProps} />;
  },
  code: Code,
  'zoom-image': ZoomImage,
  zoom: ZoomImage
};

class PostTemplate extends Component {
  render() {
    const { slug } = this.props.pageContext;
    const postNode = this.props.data.mdx;
    const post = postNode.frontmatter;
    const prev = this.props.pageContext.prev;
    const next = this.props.pageContext.next;
    const blogURL = urljoin(config.siteUrl, config.pathPrefix);
    const pageURL = urljoin(blogURL, post.slug);
    let thumbnail;

    if (!post.id) {
      post.id = slug;
    }

    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }

    if (post.thumbnail) {
      thumbnail = post.thumbnail.childImageSharp.fixed;
    }

    const date = formatDate(post.date);
    const githubLink = editOnGithub(post);

    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} – ${config.siteTitle}`}</title>
          {post.jupyter === true && <link href='/jupyter.css' rel='stylesheet' type='text/css' />}
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <article className='single container'>
          <header className='single-header'>
            {thumbnail ? (
              <Img fixed={post.thumbnail.childImageSharp.fixed} style={{ borderRadius: '50%' }} />
            ) : (
              <div />
            )}
            <div className='flex'>
              <h1>{post.title}</h1>
              <div className='post-meta'>
                <time className='date'>{date}</time>/{' '}
                <a className='github-link' href={githubLink} target='_blank'>
                  Edit on Github ✏️
                </a>
              </div>
              <PostTags tags={post.tags} />
            </div>
          </header>
          <MDXProvider components={shortcodes}>
            <HighlightShare>
              <MDXRenderer>{postNode.body}</MDXRenderer>
            </HighlightShare>
          </MDXProvider>
          <BlogPostFooter>
            <PostShare>
              <span>
                <strong>Share This:</strong>
              </span>
              <FacebookShareButton url={pageURL} quote={`${post.title}`}>
                <IoLogoFacebook />
              </FacebookShareButton>
              <TwitterShareButton url={pageURL} title={`${post.title}`}>
                <IoLogoTwitter />
              </TwitterShareButton>
              <LinkedinShareButton url={pageURL} title={`${post.title}`}>
                <IoLogoLinkedin />
              </LinkedinShareButton>
              <RedditShareButton url={pageURL} title={`${post.title}`}>
                <IoLogoReddit />
              </RedditShareButton>
            </PostShare>
          </BlogPostFooter>

          <div className='pagination-wrapper'>
            <div className='pagination-button'>
              {prev && (
                <Link className='previous' to={`${prev.fields.slug}`} aria-label='Prev'>
                  &laquo; Previous
                </Link>
              )}
            </div>

            <div className='pagination-button'>
              {next && (
                <Link className='next' to={`${next.fields.slug}`} aria-label='Next'>
                  Next &raquo;
                </Link>
              )}
            </div>
          </div>
        </article>
        <br />
        <br />
        <SimilarPosts categories={post.categories} tags={post.tags} currentArticleSlug={slug} />
        <Subscription />
      </Layout>
    );
  }
}

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug }, draft: { eq: false } }) {
      timeToRead
      excerpt
      frontmatter {
        title
        toc
        jupyter
        thumbnail {
          childImageSharp {
            fixed(width: 96, height: 96) {
              ...GatsbyImageSharpFixed
            }
          }
        }
        slug
        date
        categories
        tags
        template
      }
      fields {
        slug
        date
      }
      body
    }
  }
`;
