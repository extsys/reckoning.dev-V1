import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';

const Filler = props => {
  return <div className='value' style={{ width: `${props.percentage}%` }} />;
};

const ProgressBar = props => {
  return (
    <div className='progress' data-label={`${props.percentage}%`}>
      <Filler percentage={props.percentage} />
    </div>
  );
};

export default class ClientFetchingExample extends Component {
  state = {
    loading: false,
    error: false,
    xps: {
      total_xp: '',
      new_xp: '',
      lang_data: '',
      curr_level: '',
      levels: ''
    }
  };

  componentDidMount() {
    this.getCodeStats();
  }

  render() {
    const { total_xp, new_xp, lang_data, curr_level, levels } = this.state.xps;

    return (
      <Layout>
        <Helmet title={`Articles – ${config.siteTitle}`} />
        <SEO />
        <div className='container'>
          <h1>Summary</h1>
          <div>
            {this.state.loading ? (
              <p>Please hold, data is loading!</p>
            ) : total_xp ? (
              <>
                <strong>{`Level ${curr_level} (${total_xp} XP) (+${new_xp})`}</strong>
                <ProgressBar percentage={levels.total} />
              </>
            ) : (
              <p>Oh noes, error fetching pupper :(</p>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  // This data is fetched at run time on the client.
  getCodeStats = () => {
    this.setState({ loading: true });
    axios
      .get(`https://codestats.net/api/users/sadanand-singh`)
      .then(xps => {
        const {
          data: { total_xp: total_xp, new_xp: new_xp, languages: lang_data }
        } = xps;
        const curr_level = parseInt(Math.floor(0.025 * Math.sqrt(total_xp)));
        const target_xp = (curr_level + 1) * (curr_level + 1) * 1600 + 1;
        const curr_xp = curr_level * curr_level * 1600 - 1;
        const have_xp = total_xp - curr_xp;
        const need_xp = target_xp - curr_xp;
        const perc_level = parseInt(Math.floor((100 * have_xp) / need_xp));
        const levels = { total: perc_level };
        this.setState({
          loading: false,
          xps: {
            ...this.state.xps,
            total_xp,
            new_xp,
            lang_data,
            curr_level,
            levels
          }
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };
}
