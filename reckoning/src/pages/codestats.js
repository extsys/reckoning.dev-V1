import React, { Component } from 'react';
import axios from 'axios';
import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from  "@components/Layout"
import styled from '@emotion/styled';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Filler = styled.div`
  background-color: ${p => p.theme.colors.grey};
  display: inline-block;
  height: 100%;
  width: ${p => p.percentage}%;
`;

const Progress = styled.div`
  position: relative;
  height: 28px;
  width: 550px;
  margin-top: 10px;
  border: 1px solid ${p => p.theme.colors.primary};
  background-color: ${p => p.theme.colors.background};
  @media (max-width: 767px) {
    width: 350px;
  }
  &:before {
    content: attr(data-label);
    font-size: 1.2em;
    font-weight: bold;
    color: ${p => p.theme.colors.primary};
    position: absolute;
    text-align: center;
    top: -1px;
    left: 0;
    right: 0;
    @media (max-width: 767px) {
      top: 1.5px;
    }
`;

const ProgressBar = props => {
    return (
      <Progress data-label={`${props.percentage}%`}>
        <Filler percentage={props.percentage} />
      </Progress>
    );
  };

const Hero = styled.div`
  background-color: ${p => p.theme.colors.hero};
  color: ${p => p.theme.colors.primary};
  margin-top: 52px;
  padding-top: 20px;
  padding-bottom: 20px;
  .author {
    margin: 0 auto;
    max-width: 600px;
    text-align: center;
    padding: 0.5rem 0.75rem;
    &__logo {
      border-radius: 100%;
      width: 60px;
      height: 60px;
      margin-bottom: 2em;
    }
    &__intro {
      opacity: 0.8;
      margin-top: 1em;
      margin-bottom: 2em;
    }
    &__site-title {
      font-size: 1.8em;
      font-weight: 400;
    }
`;

const LocalContainer = styled.div`
  padding: 0 1.5rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: auto;
  color: ${p => p.theme.colors.primary};
  .large-font {
    font-size: large;
    font-weight: 600;
  }
  h2 {
    font-size: 3rem;
    line-height: 1.3;
    margin: 0 0 2rem;
    border-bottom: 2px solid ${p => p.theme.colors.horizontalRule};
    padding-bottom: .5rem;
    font-weight: 500;
  }
  p {
    font-size: 1.8rem;
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
}
`;

const ChartContainer = styled.div`
  .left {
    display: inline-block;
    width: 49%;
    @media (max-width: 780px) {
      width: 100%;
    }
  }
  .right {
    display: inline-block;
    width: 49%;
    @media (max-width: 780px) {
      width: 100%;
    }
  }
`;


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
      last_date: '',
      days_summary: ''
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
      last_date,
      days_summary
    } = this.state.xps;

    const days_options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Days of Week'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: 'XPs',
          colorByPoint: true,
          data: days_summary
        }
      ]
    };

    const lang_options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Programming Languages'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [
        {
          name: 'XPs',
          colorByPoint: true,
          data: lang_data
        }
      ]
    };

    return (
      <Layout>
        <SEO />
        <Hero>
          <div className='author'>
            <img alt='CodeStats' className='author__logo' src={'/code_stats.png'} />
            <h1 className='author__site-title'>Coding Stats via Code::Stats</h1>
            <p className='author__intro'>The free stats tracking service for programmers.</p>
          </div>
        </Hero>
        <br />
        <br />
        <Section narrow>
        <LocalContainer>
          <h2>Summary</h2>
            {this.state.loading ? (
              <p>Please hold on, data is loading!</p>
            ) : total_xp ? (
              <>
                <p>
                  <strong>Using Code::Stats Since:</strong> {start_date}
                  <br />
                  <strong>Last coded on:</strong> {last_date}
                </p>
                <span className='large-font'>{`Current Level: ${curr_level} (${total_xp} XP) (+${new_xp})`}</span>
                <ProgressBar percentage={perc_level} />
                <br />
                <strong>Additional Stats can be found at </strong>
                <a
                  href='https://codestats.net/users/sadanand-singh'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Code::Stats
                </a>
                <br />
                <br />
                <br />
                <h2>Usage Pattern</h2>
                <ChartContainer>
                  <span className='left'>
                      <HighchartsReact highcharts={Highcharts} options={lang_options} />
                  </span>
                  <span className='right'>
                      <HighchartsReact highcharts={Highcharts} options={days_options} />
                  </span>
                </ChartContainer>
              </>
            ) : (
              <p>Oh noes, error fetching data! <span role="img" aria-label="sheep">🐑😔</span></p>
            )}
        </LocalContainer>
        </Section>
      </Layout>
    );
  }

  summaryDays = data => {
    const dates = Object.keys(data).sort();
    var day_names = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    var day_ids = [];
    dates.forEach((a, i) => day_ids.push({ day: day_names[new Date(a).getDay()], xp: data[a] }));

    var result = day_ids.reduce(function(result, item) {
      result[item.day] = (result[item.day] || []).concat(item.xp);
      return result;
    }, {});

    var sum_data = function(d) {
      var vals = [];
      Object.keys(d).forEach(function(k) {
        vals.push({ name: k, y: d[k].reduce((a, b) => a + b) });
      });
      return vals;
    };

    result = sum_data(result);
    return result;
  };

  summaryLanguages = lang_data => {
    Object.keys(lang_data).map(key => lang_data[key] = lang_data[key]['xps']
    );
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
    var data_new = [];
    lang_names.forEach((a, i) => data_new.push({ name: a, y: xp_values[i] }));
    return data_new;
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
          data: { total_xp, new_xp, languages: langs, dates: dates_data }
        } = xps;
        const curr_level = this.getLevel(total_xp);
        const perc_level = this.getPercentage(total_xp);
        const dates = Object.keys(dates_data).sort();
        const start_date = dates[0];
        const last_date = dates[dates.length - 1];
        const lang_data = this.summaryLanguages(langs);
        const days_summary = this.summaryDays(dates_data);
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
            last_date,
            days_summary
          }
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };
}