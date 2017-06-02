import React from 'react'
import {Link, Redirect} from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import FlatButton from 'material-ui/FlatButton';

//导入echarts
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/lines')
require('echarts/lib/chart/line')
require('echarts/lib/component/angleAxis')
require('echarts/lib/component/axis')
require('echarts/lib/component/axisPointer')
require('echarts/lib/component/brush')
require('echarts/lib/component/calendar')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/dataZoomInside')
require('echarts/lib/component/dataZoomSelect')
require('echarts/lib/component/geo')
require('echarts/lib/component/graphic')
require('echarts/lib/component/grid')
require('echarts/lib/component/gridSimple')
require('echarts/lib/component/legend')
require('echarts/lib/component/markArea')
require('echarts/lib/component/markLine')
require('echarts/lib/component/markPoint')
require('echarts/lib/component/parallel')
require('echarts/lib/component/parallelAxis')
require('echarts/lib/component/polar')
require('echarts/lib/component/radar')
require('echarts/lib/component/radiusAxis')
require('echarts/lib/component/single')
require('echarts/lib/component/singleAxis')
require('echarts/lib/component/timeline')
require('echarts/lib/component/title')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/tooltip')
require('echarts/lib/component/visualMap')
require('echarts/lib/component/visualMapContinuous')
require('echarts/lib/component/visualMapPiecewise')

export default class TrendChartBody extends React.Component {
    constructor(props) {
        super(props);
    }

    initLine() {
        let lineChartData = this.props.status.trendChartData.order //外部传入的data数据
        let myChart = echarts.init(this.refs.lineChart) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        let options = this.setLineOption(lineChartData)
        //设置options
        myChart.setOption(options)
    }

    transformTime(obj) {
        let arr = [];
        for (let item in obj) {
            arr.push(obj[item].Time);
        }
        return arr;
    }

    transformNum(obj) {
        let arr = [];
        for (let item in obj) {
            arr.push(obj[item].Num);
        }
        return arr;
    }

    componentDidMount() {
        let UserID = this.props.user.loginname;
        let Type = this
            .props
            .location
            .pathname
            .split('/')[3];
        let BeginTime = this
            .props
            .location
            .pathname
            .split('/')[4];
        let OverTime = this
            .props
            .location
            .pathname
            .split('/')[5];
        let LiaoNum = this
            .props
            .location
            .pathname
            .split('/')[6];
        this
            .props
            .getTrendChartData(UserID, Type, BeginTime, OverTime, LiaoNum);

        this.initLine()
    }

    //一个基本的echarts图表配置函数
    setLineOption(lineChartData) {
        return {
            title: {
                text: 'HISTORY DELIVERY DATA',
                subtext: 'PN#：' + this
                    .props
                    .location
                    .pathname
                    .split('/')[6],
                left: 'center'
            },
            tooltip: {
                trigger: 'axis'
            },
            dataZoom: {
                show: true,
                realtime: true,
                start: 0,
                end: 50
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    axisTick: {
                        onGap: false
                    },
                    splitLine: {
                        show: false
                    },
                    data: this.transformTime(lineChartData)
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    splitNumber: 5,
                    boundaryGap: [
                        0.05, 0.05
                    ],
                    nameLocation: 'start',
                    axisLabel: {
                        formatter: '{value} Pcs'
                    }
                }
            ],
            series: [
                {
                    name: 'PCS',
                    type: 'line',
                    yAxisIndex: 0,
                    symbol: 'none',
                    data: this.transformNum(lineChartData)
                }
            ]
        }
    }

    render() {
        
        //加载框开始
        const doing = this.props.status.doing;
        let loadStatus = 'loading';
        if (!doing) {
            loadStatus = 'hide';
        }

        const style = {
            container: {
                position: 'relative',
                textAlign: 'center'
            },
            refresh: {
                display: 'inline-block',
                position: 'relative'
            },
            displayNone: {
                display: 'none'
            },
            displayBlock: {
                display: 'block'
            }
        };
        //加载框结束

        return (
            <MuiThemeProvider>
                <div>
                    <div style={style.container}>
                        <RefreshIndicator
                            size={40}
                            left={0}
                            top={20}
                            status={loadStatus}
                            style={style.refresh}/>
                    </div>
                    <div
                        style={doing
                        ? style.displayNone
                        : style.displayBlock}>
                        <div
                            style={{
                            textAlign: 'center'
                        }}>
                            <div
                                ref="lineChart"
                                style={{
                                width: "100%",
                                height: "300px",
                                padding:"10px"
                            }}></div>
                        </div>
                        <div
                            style={{
                            textAlign: 'center'
                        }}>
                            Start date of Search:
                            <FlatButton
                                label={this
                                .props
                                .location
                                .pathname
                                .split('/')[4]}
                                secondary={true}/><br/>
                            End date of Search:
                            <FlatButton
                                label={this
                                .props
                                .location
                                .pathname
                                .split('/')[5]}
                                secondary={true}/><br/>
                            Shipout Qty (PCS):
                            <FlatButton
                                label={this.props.status.trendChartData.hasOwnProperty('PCS')
                                ? this.props.status.trendChartData.PCS
                                : 0}
                                secondary={true}/><br/>
                            Shipout Amount ($US):
                            <FlatButton
                                label={this.props.status.trendChartData.hasOwnProperty('Amount')
                                ? this.props.status.trendChartData.Amount
                                : 0}
                                secondary={true}/>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }
}