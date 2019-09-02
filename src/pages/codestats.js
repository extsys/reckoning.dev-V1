import React, { Component } from 'react';
import axios from 'axios';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';
import Layout from '../layout';
import SEO from '../components/SEO';
import config from '../../data/SiteConfig';
import Chart from 'react-apexcharts';

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
      perc_level: '',
      start_date: '',
      last_date: ''
    }
  };

  componentDidMount() {
    this.getCodeStats();
  }

  render() {
    const {
      total_xp,
      new_xp,
      lang_data,
      curr_level,
      perc_level,
      start_date,
      last_date
    } = this.state.xps;

    const options = {
      labels: lang_data.names,
      colors: ['#2E93fA', '#20c997', '#546E7A', '#E91E63', '#FF9800', '#6f42c1'],
      legend: {
        position: 'right',
        fontSize: '16px',
        horizontalAlign: 'center',
        offsetY: 60,
        labels: { useSeriesColors: true }
      },
      dataLabels: { textAnchor: 'end', style: { fontSize: '16px' } },
      responsive: [
        {
          breakpoint: 680,
          options: {
            chart: {
              width: 360
            },
            legend: {
              position: 'bottom',
              fontSize: '16px',
              offsetY: 0
            }
          }
        }
      ]
    };

    return (
      <Layout>
        <Helmet title={`Articles – ${config.siteTitle}`} />
        <SEO />
        <div className='container'>
          <h2>Summary</h2>
          <div>
            {this.state.loading ? (
              <p>Please hold, data is loading!</p>
            ) : total_xp ? (
              <>
                <p>
                  <strong>Using Code::Stats Since:</strong> {start_date}
                  <br />
                  <strong>Last coded on:</strong> {last_date}
                </p>
                <span className='large-font'>{`Level ${curr_level} (${total_xp} XP) (+${new_xp})`}</span>
                <ProgressBar percentage={perc_level} />
                <br />
                <h2>Language Usage</h2>
                <div id='chart'>
                  <Chart options={options} series={lang_data.values} type='pie' width='480' />
                </div>
              </>
            ) : (
              <p>Oh noes, error fetching data! 😔</p>
            )}
          </div>
        </div>
      </Layout>
    );
  }

  summaryLanguages = lang_data => {
    const data = Object.keys(lang_data).map(function(key, index) {
      lang_data[key] = lang_data[key]['xps'];
    });
    var sortable = [];
    for (var lang in lang_data) {
      sortable.push([lang, lang_data[lang]]);
    }

    sortable.sort(function(a, b) {
      return b[1] - a[1];
    });
    var tops = sortable.slice(0, 5);
    var rest = sortable.slice(5);
    var res_xps = rest.map(x => x[1]);
    const rest_sum = res_xps.reduce((a, b) => a + b);
    var lang_names = tops.map(x => x[0]);
    var xp_values = tops.map(x => x[1]);
    lang_names.push('Others');
    xp_values.push(rest_sum);
    return { names: lang_names, values: xp_values };
  };

  getLevel = xps => {
    return parseInt(Math.floor(0.025 * Math.sqrt(xps)));
  };

  getPercentage = xps => {
    const curr_level = this.getLevel(xps);
    const target_xp = (curr_level + 1) * (curr_level + 1) * 1600 + 1;
    const curr_xp = curr_level * curr_level * 1600 - 1;
    const have_xp = xps - curr_xp;
    const need_xp = target_xp - curr_xp;
    return parseInt(Math.floor((100 * have_xp) / need_xp));
  };

  getCodeStats = () => {
    this.setState({ loading: true });
    axios
      .get(`https://codestats.net/api/users/sadanand-singh`)
      .then(xps => {
        const {
          data: { total_xp: total_xp, new_xp: new_xp, languages: langs, dates: dates_data }
        } = xps;
        const curr_level = this.getLevel(total_xp);
        const perc_level = this.getPercentage(total_xp);
        const dates = Object.keys(dates_data).sort();
        const start_date = dates[0];
        const last_date = dates[dates.length - 1];
        const lang_data = this.summaryLanguages(langs);
        this.setState({
          loading: false,
          xps: {
            ...this.state.xps,
            total_xp,
            new_xp,
            lang_data,
            curr_level,
            perc_level,
            start_date,
            last_date
          }
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };
}
