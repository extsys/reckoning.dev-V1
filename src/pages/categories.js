import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../layout';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash.kebabcase';
import SEO from '../components/SEO';
import Subscription from '../components/Subscription';
import config from '../../data/SiteConfig';

class CategoriesPage extends Component {
  render() {
    const { group } = this.props.data.allMdx;

    return (
      <Layout>
        <SEO />
        <Helmet title={`Categories – ${config.siteTitle}`} />
        <div className='container'>
          <h1>Categories</h1>
          <div className='tag-container'>
            {group.map(category => (
              <Link to={`/categories/${kebabCase(category.fieldValue)}`} key={category.fieldValue}>
                <span key={category.fieldValue}>
                  {category.fieldValue} <strong className='count'>{category.totalCount}</strong>
                </span>
              </Link>
            ))}
          </div>
        </div>
        <Subscription />
      </Layout>
    );
  }
}

export default CategoriesPage;

export const pageQuery = graphql`
  query CategoriesQuery {
    allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
        totalCount
      }
    }
  }
`;
