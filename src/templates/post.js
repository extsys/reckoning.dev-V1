import React, { Component } from 'react';
import { MDXProvider } from '@mdx-js/react';
import ZoomImage from '../components/ZoomImage.js';
import ImageGallery from 'react-image-gallery';
import urljoin from 'url-join';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import UserInfo from '../components/UserInfo';
import PostTags from '../components/PostTags';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import Img from 'gatsby-image';
import { formatDate, editOnGithub } from '../utils/global';
import 'katex/dist/katex.min.css';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { FacebookShareButton, TwitterShareButton, RedditShareButton } from 'react-share';
import { IoLogoFacebook, IoLogoTwitter, IoLogoReddit } from 'react-icons/io';
import { BlogPostFooter, PostShare } from './templates.style';

const shortcodes = { ZoomImage, ImageGallery };

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
            {thumbnail ? <Img fixed={post.thumbnail.childImageSharp.fixed} /> : <div />}
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
            <MDXRenderer>{postNode.body}</MDXRenderer>
          </MDXProvider>
          <BlogPostFooter>
            <PostShare>
              <span>
                <b>Share This:</b>
              </span>
              <FacebookShareButton url={pageURL} quote={`${post.title}`}>
                <IoLogoFacebook />
              </FacebookShareButton>
              <TwitterShareButton url={pageURL} title={`${post.title}`}>
                <IoLogoTwitter />
              </TwitterShareButton>
              <RedditShareButton url={pageURL} title={`${post.title}`}>
                <IoLogoReddit />
              </RedditShareButton>
            </PostShare>
          </BlogPostFooter>

          <div className='pagination-wrapper'>
            <div className='pagination-button'>
              {prev && (
                <Link to={`${prev.fields.slug}`} aria-label='Prev'>
                  <IoMdArrowRoundBack />
                </Link>
              )}
            </div>

            <div className='pagination-button'>
              {next && (
                <Link to={`${next.fields.slug}`} aria-label='Next'>
                  <IoMdArrowRoundForward />
                </Link>
              )}
            </div>
          </div>
        </article>
        <UserInfo config={config} />
      </Layout>
    );
  }
}

export default PostTemplate;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    mdx(fields: { slug: { eq: $slug } }) {
      timeToRead
      excerpt
      frontmatter {
        title
        toc
        bokeh
        jupyter
        thumbnail {
          childImageSharp {
            fixed(width: 150, height: 150) {
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
