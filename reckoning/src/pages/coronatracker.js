import React, { Component } from 'react';
import axios from 'axios';
import Section from "@components/Section";
import SEO from "@components/SEO";
import Layout from  "@components/Layout"
import styled from '@emotion/styled';
import Tables from '@components/Tables'
import { useTable, useSortBy } from 'react-table'
import Modal from 'react-modal';

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

  #state-cases-new {
    padding-left: 20px;
  }

  #state-cases-color-legend {
    height: 25px;
  }

  .text-left {
    text-align: left!important;

  }

  .note {
    font-weight: 300;
    font-size: 10px;
    display: inline;
    color: ${p => p.theme.colors.primary};
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
      margin-left: 0px;
      margin-top: 20px;
    }
  }
`;

function StateModal({state, data}){
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

  const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

  const daily_plot_options = {
    title: {
      text: `Daily Confirmed Cases in ${state}`
    },
    xAxis: {
      tickPixelInterval: 1400,
      categories: data.date,
      tickInterval: 4
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
        data: data[state]
      },
    ]
  };

    return (
      <div>
        <button onClick={openModal}><strong>{state}</strong></button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="State-wise Data"
        >

          <h2 ref={_subtitle => (subtitle = _subtitle)}></h2>
          <button onClick={closeModal}>❌</button>
          <ChartContainer>
            <HighchartsReact highcharts={Highcharts} options={daily_plot_options} />
          </ChartContainer>
        </Modal>
      </div>
    );
}


function Table({ columns, data, state_data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  )

  return (
    <>
      <Tables.Table {...getTableProps()}>
      <Tables.Head>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <Tables.HeadCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span>
                </Tables.HeadCell>
              ))}
            </tr>
          ))}
        </Tables.Head>
        <tbody {...getTableBodyProps()}>
          {rows.map(
            (row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <Tables.Cell {...cell.getCellProps()}>
                        {(cell.column.Header === "State") ? <StateModal state={cell.row.original.state} data={state_data}></StateModal>: <>{cell.render('Cell')}</>}
                        {(cell.column.Header !== "Confirmed") ? <></> : (cell.row.original.deltaconfirmed === 0)? <></> : <span className='delta'>{'   '}(+{cell.row.original.deltaconfirmed})</span>}
                        {(cell.column.Header !== "Deaths") ? <></> : (cell.row.original.deltadeaths === 0)? <></> : <span className='delta-deaths'>{'   '}(+{cell.row.original.deltadeaths})</span>}

                      </Tables.Cell>
                    )
                  })}
                </tr>
              )}
          )}
        </tbody>
      </Tables.Table>
      <br />
    </>
  )
}


export default class CoronaTracker extends Component {
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
      },
      india_states_data: {
        'Andhra Pradesh': [],
        'Arunachal Pradesh': [],
        'Assam': [],
        'Bihar': [],
        'Chhattisgarh': [],
        'Goa': [],
        'Gujarat': [],
        'Haryana': [],
        'Himachal Pradesh': [],
        'Jharkhand': [],
        'Karnataka': [],
        'Kerala': [],
        'Madhya Pradesh': [],
        'Maharashtra': [],
        'Manipur': [],
        'Meghalaya': [],
        'Mizoram': [],
        'Nagaland': [],
        'Odisha': [],
        'Punjab': [],
        'Rajasthan': [],
        'Sikkim': [],
        'Tamil Nadu': [],
        'Telangana': [],
        'Tripura': [],
        'Uttarakhand': [],
        'Uttar Pradesh': [],
        'West Bengal': [],
        'Andaman and Nicobar Islands': [],
        'Chandigarh': [],
        'Dadra and Nagar Haveli': [],
        'Daman and Diu': [],
        'Delhi': [],
        'Jammu and Kashmir': [],
        'Ladakh': [],
        'Lakshadweep': [],
        'Puducherry': [],
        'status': [],
        'date': [],
        'total':[]
      }
    },
  };

  componentDidMount() {
    this.getGlobalOverview();
    this.getIndiaOverview();
    this.getIndiaStatesData();
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
      india_time_series_full,
      india_states_data
    } = this.state.india;

    const columns= [
      {
        Header: 'State',
        accessor: 'state',
      },
      {
        Header: 'Confirmed',
        accessor: 'confirmed',
      },
      {
        Header: 'Deaths',
        accessor: 'deaths',
      },
      {
        Header: 'Cases per 1M',
        accessor: 'confirmed_per_capita',
      },
    ];

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
                <Table columns={columns} data={india_statewise} state_data={india_states_data}/>
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

    return {
      'confirmed_daily': {
        'name': 'Confirmed',
        'data': arr.map(function (el) { return parseInt(el.dailyconfirmed, 10); })
      },
      'confirmed_cum': {
        'name': 'Confirmed',
        'data': arr.map(function (el) { return parseInt(el.totalconfirmed, 10); })
      },
      'deaths_daily': {
        'name': 'Confirmed',
        'data': arr.map(function (el) { return parseInt(el.dailydeceased, 10); })
      },
      'deaths_cum': {
        'name': 'Confirmed',
        'data': arr.map(function (el) { return parseInt(el.totaldeceased, 10); })
      },
      'dates': arr.map(function (el) { return el.date; })
    };
  };

  getIndiaSeriesDataFull = data => {
    var res = {
      'confirmed_daily': {
        'name': 'Confirmed',
        'data': data.map(function (el) { return parseInt(el.dailyconfirmed, 10); })
      },
      'confirmed_cum': {
        'name': 'Confirmed',
        'data': data.map(function (el) { return parseInt(el.totalconfirmed, 10); })
      },
      'deaths_daily': {
        'name': 'Confirmed',
        'data': data.map(function (el) { return parseInt(el.dailydeceased, 10); })
      },
      'deaths_cum': {
        'name': 'Confirmed',
        'data': data.map(function (el) { return parseInt(el.totaldeceased, 10); })
      },
      'dates': data.map(function (el) { return el.date; })
    }

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

  getIndiaStatesData = () => {
    this.setState({ loading: true });
    axios
      .get(`https://api.covid19india.org/states_daily.json`)
      .then(india => {
        const {
          data: { states_daily }
        } = india;
        var states_data = states_daily.filter( (el) => {return el.status === 'Confirmed'});
        const stateCodes = {
          AP: 'Andhra Pradesh',
          AR: 'Arunachal Pradesh',
          AS: 'Assam',
          BR: 'Bihar',
          CT: 'Chhattisgarh',
          GA: 'Goa',
          GJ: 'Gujarat',
          HR: 'Haryana',
          HP: 'Himachal Pradesh',
          JH: 'Jharkhand',
          KA: 'Karnataka',
          KL: 'Kerala',
          MP: 'Madhya Pradesh',
          MH: 'Maharashtra',
          MN: 'Manipur',
          ML: 'Meghalaya',
          MZ: 'Mizoram',
          NL: 'Nagaland',
          OR: 'Odisha',
          PB: 'Punjab',
          RJ: 'Rajasthan',
          SK: 'Sikkim',
          TN: 'Tamil Nadu',
          TG: 'Telangana',
          TR: 'Tripura',
          UT: 'Uttarakhand',
          UP: 'Uttar Pradesh',
          WB: 'West Bengal',
          AN: 'Andaman and Nicobar Islands',
          CH: 'Chandigarh',
          DN: 'Dadra and Nagar Haveli',
          DD: 'Daman and Diu',
          DL: 'Delhi',
          JK: 'Jammu and Kashmir',
          LA: 'Ladakh',
          LD: 'Lakshadweep',
          PY: 'Puducherry',
          STATUS: 'status',
          DATE: 'date',
          TT: 'total'
        }

        states_data = states_data.map((el) => {
            var new_obj = {};
            Object.keys(el).forEach( (s) => {
              (s === 'date' || s === 'status') ? new_obj[stateCodes[s.toUpperCase()]] = el[s] : new_obj[stateCodes[s.toUpperCase()]] = parseInt(el[s], 10)
            });
            return new_obj;
        });

        let india_states_data = {};

        states_data.forEach(obj => {
          Object.keys(obj).forEach(key => {
            india_states_data[key] = (india_states_data[key] || []).concat([obj[key]]);
          });
        });

        this.setState({
          loading: false,
          india: {
            ...this.state.india,
            india_states_data
          }
        });
      })
      .catch(error => {
        this.setState({ loading: false, error });
      });
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
          return {
            'active': parseInt(el.active, 10),
            'confirmed': parseInt(el.confirmed, 10),
            'confirmed_per_capita': (parseInt(el.confirmed, 10) / population[el.state] * 1000000).toFixed(3),
            'deaths': parseInt(el.deaths, 10),
            'deltaconfirmed': parseInt(el.deltaconfirmed, 10),
            'deltadeaths': parseInt(el.deltadeaths, 10),
            'deltarecovered': parseInt(el.deltarecovered, 10),
            'recovered': parseInt(el.recovered, 10),
            'lastupdatedtime': el.lastupdatedtime,
            'state': el.state,
            'statecode': el.statecode,
            'statenotes': el.statenotes,
          }
        });

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