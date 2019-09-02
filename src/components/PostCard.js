import React, { Component } from 'react';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import { formatDate } from '../utils/global';
import moment from 'moment';

export default class PostCard extends Component {
  getPostList() {
    const { postEdges } = this.props;
    const postList = postEdges
      .filter(postEdge => postEdge.node.frontmatter.template === 'post')
      .map(postEdge => {
        return {
          path: postEdge.node.fields.slug,
          tags: postEdge.node.frontmatter.tags,
          thumbnail: postEdge.node.frontmatter.thumbnail,
          title: postEdge.node.frontmatter.title,
          date: postEdge.node.fields.date,
          excerpt: postEdge.node.excerpt,
          timeToRead: postEdge.node.timeToRead,
          categories: postEdge.node.frontmatter.categories
        };
      });
    return postList;
  }

  render() {
    const { simple } = this.props;
    const postList = this.getPostList();

    return (
      <div class='container'>
        <section className='post-feed'>
          {postList.map(post => {
            const date = formatDate(post.date);

            return (
              <Link to={post.path} className='post-card'>
                <header className='post-card-header'>
                  <h5 className='post-card-title'>{post.title}</h5>
                  <p className='post-card-excerpt'>Published on: {date}</p>
                </header>

                <section className='post-card-excerpt'>{post.excerpt}</section>
              </Link>
            );
          })}
        </section>
      </div>
    );
  }
}
