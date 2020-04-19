import React, { Component } from 'react';
import axios from 'axios';
import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from  "@components/Layout"
import styled from '@emotion/styled';
import Tables from '@components/Tables'

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
      width: 90px;
      height: 90px;
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
  .overview {
    max-width: 630px;
    margin: 30px auto;
    display: flex;
    background-color: none;
    border-radius: 10px;
  }
  .overview .box {
    flex: 0 0 50%;
    max-width: 45%;
    margin: 0 auto;
    padding: 15px 0;
    background: ${p => p.theme.colors.hero};
    border-radius: 10px;
  }

  .overview .box .big-number-header .big-number {
    font-size: calc(1.40625rem + 2.2681451613vw);
    line-height: 45px;
    font-weight: 700;
    text-align: center;
    display: block;
    margin: 0 0 5px;
  }

  .overview .box .big-number-footer .big-number-fineprint, .overview .box .big-number-header .big-number-label {
    /* font-size: .9375rem; */
    line-height: 15px;
    font-family: "Benton Gothic",Arial,sans-serif;
    font-weight: 500;
    text-align: center;
  }

  .overview .box.confirmed {
    color: #026f90;
  }

  .overview .box.first {
    margin-left: 0;
  }

  .overview .box .big-number-header .big-number {
    font-family: "Benton Gothic",Arial,sans-serif;
  }

  .overview .box .big-number-footer {
      margin: 20px 0 0;
  }

  .overview .box .big-number-footer .big-number-fineprint {
      margin: 10px 0 0;
  }

  .overview .box .big-number-footer .small-number {
    font-weight: 700;
  }

  .overview .box.second {
    margin-right: 0;
  }

  .overview .box.death {
    color: #45B39D;
  }

  .delta {
    color: #026f90;
  }

  .delta-deaths {
    color: #45B39D;
  }

  h2 {
    font-size: 3rem;
    line-height: 1.3;
    margin: 0 0 2rem;
    border-bottom: 2px solid ${p => p.theme.colors.horizontalRule};
    padding-bottom: .5rem;
    font-weight: 500;
  }

  h3 {
    font-size: 2.2rem;
    line-height: 1.3;
    margin: 0 0 2rem;
    padding-bottom: .5rem;
    font-weight: 600;
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
    margin-left: 20px;
    @media (max-width: 780px) {
      width: 100%;
    }
  }
`;


export default class ClientDataFetching extends Component {
  state = {
    loading: false,
    error: false,
    global: {
      global_confirmed: '',
      global_deaths: '',
      global_today: '',
      global_deaths_today: '',
      update_date: '',
    },
    india: {
      india_confirmed: '',
      india_deaths: '',
      india_today: '',
      india_deaths_today: '',
      india_statewise: [{
        active: '',
        confirmed: '',
        confirmed_per_capita: '',
        deaths: '',
        deltaconfirmed: '',
        deltadeaths: '',
        deltarecovered: '',
        lastupdatedtime: '',
        recovered: '',
        state: '',
        statecode: '',
        statenotes: ''
      }],
      india_time_series: {
        confirmed_cum: {name: '', data: [], },
        confirmed_daily: {name: '', data: [], },
        deaths_cum: {name: '', data: [], },
        deaths_daily: {name: '', data: [], },
        dates: []
      },
      india_time_series_full: {
        confirmed_cum: {name: '', data: [], },
        confirmed_daily: {name: '', data: [], },
        deaths_cum: {name: '', data: [], },
        deaths_daily: {name: '', data: [], },
        dates: []
      }
    }
  };

  componentDidMount() {
    this.getGlobalOverview();
    this.getIndiaOverview();
  };

  render() {
    const {
      global_confirmed,
      global_deaths,
      global_today,
      global_deaths_today,
      update_date,
    } = this.state.global;

    const {
      india_confirmed,
      india_deaths,
      india_today,
      india_deaths_today,
      india_statewise,
      india_time_series,
      india_time_series_full
    } = this.state.india;

    const cum_plot_options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'spline'
      },
      title: {
        text: 'Growth of Cases in India'
      },
      xAxis: {
        tickPixelInterval: 800,
        categories: india_time_series.dates
      },
      yAxis: {
        title: {
            text: 'Number of Cases'
        }
    },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
        }
    },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 600
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      },
      series: [
        {
          name: 'Confirmed',
          data: india_time_series.confirmed_cum.data
        },
        {
          name: 'Deaths',
          color: 'orange',
          data: india_time_series.deaths_cum.data
        }
      ]
    };

    const daily_deaths_plot_options = {
      title: {
        text: 'Daily Deaths in India'
      },
      xAxis: {
        tickPixelInterval: 800,
        categories: india_time_series_full.dates,
        tickInterval: 8
      },
      legend: {
        enabled: true
      },
      yAxis: {
        title: {
            text: 'Number of Cases'
        }
    },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
        },
        spline: {
          marker: {
            enabled: false
          }
        }
    },
      series: [
        {
          name: 'Deaths',
          type: 'column',
          color: 'orange',
          data: india_time_series_full.deaths_daily.data
        },
        {
          name: '7-day Average',
          type: 'spline',
          color: 'gray',
          data: india_time_series_full.deaths_daily.running
        },
      ]
    };

    const daily_plot_options = {
      title: {
        text: 'Daily Confirmed Cases in India'
      },
      xAxis: {
        tickPixelInterval: 800,
        categories: india_time_series_full.dates,
        tickInterval: 8
      },
      legend: {
        enabled: true
      },
      yAxis: {
        title: {
            text: 'Number of Cases'
        }
    },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
      },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
        },
        spline: {
          marker: {
            enabled: false
          }
        }
    },
      series: [
        {
          name: 'Confirmed',
          type: 'column',
          data: india_time_series_full.confirmed_daily.data
        },
        {
          name: '7-day Average',
          type: 'spline',
          data: india_time_series_full.confirmed_daily.running
        },
      ]
    };


    return (
      <Layout>
        <SEO />
        <Hero>
          <div className='author'>
            <img alt='Corona Virus' className='author__logo' src={'/corona.png'} />
            <h1 className='author__site-title'>COVID-19 India Tracker</h1>
            <p className='author__intro'>An user-friendly tracker for COVID-19 cases in India</p>
          </div>
        </Hero>
        <br />
        <br />
        <Section narrow>
        <LocalContainer>
          <h2>Overview</h2>
            {this.state.loading ? (
              <p>Please hold on, data is loading!</p>
            ) : global_confirmed ? (
              <>
              <span className='large-font'>{`Last Updated: ${update_date}`}</span>
              <br/>
              <br/>
              <br/>
              {/* {india_statewise} */}
              <h3>Global</h3>
              <div className='overview'>
              <div className='box first confirmed'>
                <div className='big-number-header'>
                  <div className='big-number'>{global_confirmed}</div>
                  <div className='big-number-label'>confirmed cases</div>
                </div>

                <div className='big-number-footer'>
                  <div className='big-number-fineprint'>
            <div className='small-number'>+{global_today} {' '}so far today</div>
                  </div>
                </div>
              </div>

              <div className='box second death'>
                <div className='big-number-header'>
                  <div className='big-number'>{global_deaths}</div>
                  <div className='big-number-label'>deaths</div>
                </div>

                <div className='big-number-footer'>
                  <div className='big-number-fineprint'>
            <div className='small-number'>+{global_deaths_today} {' '}so far today</div>
                  </div>
                </div>
              </div>

              </div>

              <h3>India</h3>
              <div className='overview'>
              <div className='box first confirmed'>
                <div className='big-number-header'>
                  <div className='big-number'>{india_confirmed}</div>
                  <div className='big-number-label'>confirmed cases</div>
                </div>

                <div className='big-number-footer'>
                  <div className='big-number-fineprint'>
            <div className='small-number'>+{india_today} {' '}so far today</div>
                  </div>
                </div>
              </div>

              <div className='box second death'>
                <div className='big-number-header'>
                  <div className='big-number'>{india_deaths}</div>
                  <div className='big-number-label'>deaths</div>
                </div>

                <div className='big-number-footer'>
                  <div className='big-number-fineprint'>
            <div className='small-number'>+{india_deaths_today} {' '}so far today</div>
                  </div>
                </div>
              </div>

              </div>
              <br />
                <br />
                <br />
                <h2>Trends in India</h2>
                <ChartContainer>
                      <HighchartsReact highcharts={Highcharts} options={cum_plot_options} />
                </ChartContainer>
                <br/>
                <br/>
                <ChartContainer>
                    <span className='left'>
                      <HighchartsReact highcharts={Highcharts} options={daily_plot_options} />
                    </span>
                    <span className='right'>
                      <HighchartsReact highcharts={Highcharts} options={daily_deaths_plot_options} />
                    </span>
                </ChartContainer>
                <br/>
                <br/>
                <h2>State-wise Cases in India</h2>
                <Tables.Table>
                <Tables.Head>
                <tr>
                  <Tables.HeadCell>State</Tables.HeadCell>
                  <Tables.HeadCell>Confirmed</Tables.HeadCell>
                  <Tables.HeadCell>Death</Tables.HeadCell>
                  <Tables.HeadCell>Confirmed per 1M</Tables.HeadCell>
                </tr>
                </Tables.Head>
                <tbody>
                {india_statewise.map( (el) => {
                  return (<tr>
                    <Tables.Cell>{el.state}</Tables.Cell>
                    <Tables.Cell>{el.confirmed} {' '}{'   '}
                      <span className='delta'>(+{el.deltaconfirmed})</span>
                    </Tables.Cell>
                    <Tables.Cell>{el.deaths} {' '}{'   '}
                      <span className='delta-deaths'>(+{el.deltadeaths})</span>
                    </Tables.Cell>
                    <Tables.Cell>{el.confirmed_per_capita}</Tables.Cell>
                </tr>);
                })};
              </tbody>
              </Tables.Table>
              </>
            ) : (
              <p>Oh noes, error fetching data! <span role="img" aria-label="sheep">🐑😔</span></p>
            )}
        </LocalContainer>
        </Section>
      </Layout>
    );
  }

  numberWithCommas = x => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }


  getGlobalOverview = () => {
    this.setState({ loading: true });
    axios
      .get(`https://corona.lmao.ninja/v2/all`)
      .then(global => {
        const {
          data: { updated, cases, deaths, todayCases, todayDeaths }
        } = global;

        let date = new Date(updated)
        let update_date = date.toLocaleString().replace(',', '')

        let global_confirmed = this.numberWithCommas(cases);
        let global_deaths = this.numberWithCommas(deaths);
        let global_today = this.numberWithCommas(todayCases);
        let global_deaths_today = this.numberWithCommas(todayDeaths);

        this.setState({
          loading: false,
          global: {
            ...this.state.global,
            global_confirmed,
            global_deaths,
            global_today,
            global_deaths_today,
            update_date
          }
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };

  getIndiaSeriesData = data => {
    var arr = [];
    var maxVal = 20;
    var delta = Math.floor( data.length / maxVal );
    var i;
    for (i = 0; i < data.length; i=i+delta) {
      arr.push(data[i]);
    }
    let last_date = data[data.length-1].date
    let curr_last_date = arr[arr.length-1].date

    if (last_date !== curr_last_date) {
      arr.push(data[data.length-1]);
    }

    var res = new Object();
    res['confirmed_daily'] = new Object()
    res['confirmed_daily']['name'] = 'Confirmed'
    res['confirmed_daily']['data'] = arr.map(function (el) { return parseInt(el.dailyconfirmed, 10); })

    res['confirmed_cum'] = new Object()
    res['confirmed_cum']['name'] = 'Confirmed'
    res['confirmed_cum']['data'] = arr.map(function (el) { return parseInt(el.totalconfirmed, 10); })

    res['deaths_daily'] = new Object()
    res['deaths_daily']['name'] = 'Deaths'
    res['deaths_daily']['data'] = arr.map(function (el) { return parseInt(el.dailydeceased, 10); })

    res['deaths_cum'] = new Object()
    res['deaths_cum']['name'] = 'Deaths'
    res['deaths_cum']['data'] = arr.map(function (el) { return parseInt(el.totaldeceased, 10); })

    res['dates'] = arr.map(function (el) { return el.date; })

    return res;
  };

  getIndiaSeriesDataFull = data => {
    var res = new Object();
    res['confirmed_daily'] = new Object()
    res['confirmed_daily']['name'] = 'Confirmed'
    res['confirmed_daily']['data'] = data.map(function (el) { return parseInt(el.dailyconfirmed, 10); })

    res['confirmed_cum'] = new Object()
    res['confirmed_cum']['name'] = 'Confirmed'
    res['confirmed_cum']['data'] = data.map(function (el) { return parseInt(el.totalconfirmed, 10); })

    res['deaths_daily'] = new Object()
    res['deaths_daily']['name'] = 'Deaths'
    res['deaths_daily']['data'] = data.map(function (el) { return parseInt(el.dailydeceased, 10); })

    res['deaths_cum'] = new Object()
    res['deaths_cum']['name'] = 'Deaths'
    res['deaths_cum']['data'] = data.map(function (el) { return parseInt(el.totaldeceased, 10); })

    res['dates'] = data.map(function (el) { return el.date; })

    // calc running averages

    var running_confirmed = [];
    var period = 7;
    var sumForAverage = 0;
    var i;
    for(i=0;i<res.confirmed_daily.data.length;i++) {
        sumForAverage += res.confirmed_daily.data[i];
        if(i<period) {
          running_confirmed.push(0);
        } else {
            sumForAverage -= res.confirmed_daily.data[i-period];
            running_confirmed.push(sumForAverage/period);
        }
    }
    res['confirmed_daily']['running'] = running_confirmed

    var running_deaths = [];
    sumForAverage = 0;
    for(i=0;i<res.deaths_daily.data.length;i++) {
        sumForAverage += res.deaths_daily.data[i];
        if(i<period) {
          running_deaths.push(0);
        } else {
            sumForAverage -= res.deaths_daily.data[i-period];
            running_deaths.push(sumForAverage/period);
        }
    }
    res['deaths_daily']['running'] = running_deaths

    return res;
  };

  getIndiaOverview = () => {
    this.setState({ loading: true });
    axios
      .get(`https://api.covid19india.org/data.json`)
      .then(india => {
        const {
          data: { statewise: statewise_data, cases_time_series }
        } = india;
        let total = statewise_data[0];
        let india_confirmed = this.numberWithCommas(total.confirmed);
        let india_deaths = this.numberWithCommas(total.deaths);
        let india_today = this.numberWithCommas(total.deltaconfirmed);
        let india_deaths_today = this.numberWithCommas(total.deltadeaths);
        let india_time_series = this.getIndiaSeriesData(cases_time_series);
        let india_time_series_full = this.getIndiaSeriesDataFull(cases_time_series);

        let population = {
          "Maharashtra": 112374333,
          "Delhi": 16787941,
          "Tamil Nadu": 72147030,
          "Rajasthan": 68548437,
          "Madhya Pradesh": 72626809,
          "Gujarat": 60439692,
          "Uttar Pradesh": 199812342,
          "Telangana": 35003674,
          "Andhra Pradesh": 49577103,
          "Kerala": 33406061,
          "Karnataka": 61095297,
          "Jammu and Kashmir": 12267032,
          "West Bengal": 91276115,
          "Haryana": 25351462,
          "Punjab": 27743338,
          "Bihar": 104099452,
          "Odisha": 41974219,
          "Uttarakhand": 10086292,
          "Chhattisgarh": 25545198,
          "Himachal Pradesh": 6864602,
          "Assam": 31205576,
          "Jharkhand": 32988134,
          "Chandigarh": 1055450,
          "Ladakh": 274000,
          "Andaman and Nicobar Islands": 380581,
          "Meghalaya": 2966889,
          "Goa": 1458545,
          "Puducherry": 1247953,
          "Manipur": 2570390,
          "Tripura": 3673917,
          "Mizoram": 1097206,
          "Arunachal Pradesh": 1383727,
          "Nagaland":1978502,
          "Dadra and Nagar Haveli": 343709,
          "Daman and Diu": 242911,
          "Lakshadweep": 64473,
          "Sikkim": 610577,
        };

        var india_statewise = statewise_data.slice(1).map(function (el) {
          var d = new Object();
          d['active'] = parseInt(el.active, 10);
          d['confirmed'] = parseInt(el.confirmed, 10);
          d['confirmed_per_capita'] = (parseInt(el.confirmed, 10) / population[el.state] * 1000000).toFixed(3);
          d['deaths'] = parseInt(el.deaths, 10);
          d['deltaconfirmed'] = parseInt(el.deltaconfirmed, 10);
          d['deltadeaths'] = parseInt(el.deltadeaths, 10);
          d['deltarecovered'] = parseInt(el.deltarecovered, 10);
          d['recovered'] = parseInt(el.recovered, 10);
          d['lastupdatedtime'] = el.lastupdatedtime;
          d['state'] = el.state;
          d['statecode'] = el.statecode;
          d['statenotes'] = el.statenotes;

          return d
        });

        india_statewise.sort((a, b)=>{
          return (b.confirmed_per_capita - a.confirmed_per_capita || b.confirmed - a.confirmed)
        })

        console.log(india_statewise);

        this.setState({
          loading: false,
          india: {
            ...this.state.india,
            india_confirmed,
            india_deaths,
            india_today,
            india_deaths_today,
            india_statewise,
            india_time_series,
            india_time_series_full
          }
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };
}