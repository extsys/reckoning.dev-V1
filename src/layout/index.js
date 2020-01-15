import React, { Component } from 'react';
import ScrollToTop from 'react-scroll-up';
import ThemeContext from '../context/ThemeContext';
import Helmet from 'react-helmet';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ScrollUpButton from '../components/ScrollUpButton/ScrollUpButton';
import Subscription from '../components/Subscription';
import config from '../../data/SiteConfig';
import ScriptTag from 'react-script-tag';
import favicon from '../images/favicon.png';
import '../styles/main.scss';

class MainLayout extends Component {
  static contextType = ThemeContext;

  render() {
    const { dark, notFound } = this.context;
    const { children } = this.props;

    return (
      <>
        <Helmet
          bodyAttributes={{
            class: `theme ${dark && !notFound ? 'dark' : '' || notFound ? 'not-found' : ''}`
          }}
        >
          <meta name='description' content={config.siteDescription} />
          <link rel='shortcut icon' type='image/png' href={favicon} />
        </Helmet>
        <Navigation menuLinks={config.menuLinks} />
        <main id='main-content'>{children}</main>
        <ScriptTag type='text/javascript' src='/Counter.js' />
        <Subscription />
        <Footer />
        <ScrollToTop
          showUnder={300}
          duration={700}
          easing='easeInOutCubic'
          style={{ bottom: 30, right: 20 }}
        >
          <ScrollUpButton />
        </ScrollToTop>
      </>
    );
  }
}

export default MainLayout;
