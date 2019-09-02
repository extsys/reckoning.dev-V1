import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import PostCard from '../components/PostCard';
import { includes, orderBy } from 'lodash';

const SimilarPostsComponent = ({ articles }) => (
  <aside className='single container'>
    <h2>Similar Posts</h2>
    <PostCard postEdges={articles} />
  </aside>
);

class SimilarPostsFactory {
  constructor(articles, currentArticleSlug) {
    this.articles = articles
      .filter(postEdge => postEdge.node.frontmatter.template === 'post')
      .filter(postEdge => postEdge.node.fields.slug !== currentArticleSlug);
    this.currentArticleSlug = currentArticleSlug;
    this.maxArticles = 3;
    this.categories = [];
    this.tags = [];
  }

  setMaxArticles(m) {
    this.maxArticles = m;
    return this;
  }

  setCategories(aCategories) {
    this.categories = aCategories;
    return this;
  }

  setTags(tagsArray) {
    this.tags = tagsArray;
    return this;
  }

  getArticles() {
    const { categories, tags, articles, maxArticles } = this;
    const identityMap = {};

    function getSlug(article) {
      return article.node.fields.slug;
    }

    function addToMap(article) {
      const slug = getSlug(article);

      if (!identityMap.hasOwnProperty(slug)) {
        identityMap[slug] = {
          article: article,
          points: 0
        };
      }
    }

    function addCategoryPoints(article, categories) {
      const categoryPoints = 2;
      const slug = getSlug(article);
      article.node.frontmatter.categories.forEach(aCat => {
        if (includes(categories, aCat)) {
          identityMap[slug].points += categoryPoints;
        }
      });
    }

    function addTagsPoints(article, tags) {
      const tagPoint = 1;
      const slug = getSlug(article);

      article.node.frontmatter.tags.forEach(aTag => {
        if (includes(tags, aTag)) {
          identityMap[slug].points += tagPoint;
        }
      });
    }

    function getIdentityMapAsArray() {
      return Object.keys(identityMap).map(slug => identityMap[slug]);
    }

    for (let article of articles) {
      addToMap(article);
      addCategoryPoints(article, categories);
      addTagsPoints(article, tags);
    }

    const arrayIdentityMap = getIdentityMapAsArray();
    const similarPosts = orderBy(arrayIdentityMap, ['points'], ['desc']);
    const similarPostsFiltered = similarPosts.splice(0, maxArticles);
    var result = [];
    for (var d in similarPostsFiltered) {
      result.push(similarPostsFiltered[d].article);
    }
    return result;
  }
}

export default props => (
  <StaticQuery
    query={graphql`
      query SimilarPosts {
        posts: allMdx(
          sort: { fields: [fields___date], order: DESC }
          filter: { fields: { draft: { eq: false } } }
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
    `}
    render={data => {
      const { categories, tags, currentArticleSlug } = props;

      const articles = data.posts.edges;
      const similarPosts = new SimilarPostsFactory(articles, currentArticleSlug)
        .setMaxArticles(6)
        .setCategories(categories)
        .setTags(tags)
        .getArticles();

      return <SimilarPostsComponent articles={similarPosts} />;
    }}
  />
);
