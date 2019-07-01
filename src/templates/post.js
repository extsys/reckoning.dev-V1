import React, { Component } from 'react';
import { DiscussionEmbed, CommentCount } from 'disqus-react';
import urljoin from 'url-join';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import UserInfo from '../components/UserInfo';
import PostTags from '../components/PostTags';
import NewsletterForm from '../components/NewsletterForm';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import Img from 'gatsby-image';
import { formatDate, editOnGithub } from '../utils/global';
import 'katex/dist/katex.min.css';
import rehypeReact from 'rehype-react';
import ZoomImage from '../components/ZoomImage';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import { PaginationWrapper, PrevPage, NextPage } from '../components/PaginationButtons/buttons';
import { FacebookShareButton, TwitterShareButton, RedditShareButton } from 'react-share';
import { IoLogoFacebook, IoLogoTwitter, IoLogoReddit } from 'react-icons/io';
import { BlogPostFooter, PostShare } from './templates.style';

class PostTemplate extends Component {
  render() {
    const { slug } = this.props.pageContext;
    const postNode = this.props.data.markdownRemark;
    const post = postNode.frontmatter;
    const prev = this.props.pageContext.prev;
    const next = this.props.pageContext.next;
    const blogURL = urljoin(config.siteUrl, config.pathPrefix);
    const pageURL = urljoin(blogURL, post.slug);
    const disqusShortname = config.disqusName;
    const disqusConfig = {
      identifier: post.slug,
      title: post.title
    };

    const renderAst = new rehypeReact({
      createElement: React.createElement,
      components: {
        'zoom-image': ZoomImage
      }
    }).Compiler;

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
    const twitterUrl = 'https://twitter.com/search?q=' + config.siteUrl + '/' + post.slug + '/';
    const twitterShare =
      'https://twitter.com/intent/tweet/?text=' +
      encodeURIComponent(post.title) +
      '&url=' +
      config.siteUrl +
      '/' +
      post.slug +
      '/&via=sadanandsingh';

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
                <a href='#comments'>
                  <CommentCount shortname={disqusShortname} config={disqusConfig}>
                    Comments
                  </CommentCount>
                </a>{' '}
                /{' '}
                <a className='github-link' href={githubLink} target='_blank'>
                  Edit on Github ✏️
                </a>
              </div>
              <PostTags tags={post.tags} />
            </div>
          </header>
          {post.toc === true && (
            <div className='post' dangerouslySetInnerHTML={{ __html: postNode.tableOfContents }} />
          )}
          {renderAst(postNode.htmlAst)}

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

          <PaginationWrapper>
            <PrevPage>
              {prev && (
                <Link to={`${prev.fields.slug}`} aria-label='Prev'>
                  <IoMdArrowRoundBack />
                </Link>
              )}
            </PrevPage>

            <NextPage>
              {next && (
                <Link to={`${next.fields.slug}`} aria-label='Next'>
                  <IoMdArrowRoundForward />
                </Link>
              )}
            </NextPage>
          </PaginationWrapper>

          <h2 id='comments'>Comments</h2>
          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />

          <h3>Stay in touch</h3>
          <p>Like the posts you see here? Sign up to get notified about new ones.</p>
          <NewsletterForm />
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
    markdownRemark(fields: { slug: { eq: $slug } }) {
      htmlAst
      tableOfContents
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
    }
  }
`;
