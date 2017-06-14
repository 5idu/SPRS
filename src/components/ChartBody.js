import React from 'react'
import { Link,Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';

//导入echarts
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/pie') //pie图表
require('echarts/lib/chart/bar') //bar图表
require('echarts/lib/component/title') //title插件
require('echarts/lib/component/legend') //legend插件
require('echarts/lib/component/tooltip') //tooltip插件

export default class ChartBody extends React.Component {
    constructor(props) {
        super(props);
    }

    getTimeArray() {
        var TimeArray = [];
		var now = new Date();
		if (now.getMonth() == 0) {
            TimeArray.push('~' + (now.getFullYear() - 1) + '11');
			TimeArray.push((now.getFullYear() - 1) + '12');
			TimeArray.push(now.getFullYear() + '01');
			TimeArray.push(now.getFullYear() + '02');
			TimeArray.push(now.getFullYear() + '03~');
			return TimeArray;
		}
	    if (now.getMonth() == 1) {
			TimeArray.push('~' + (now.getFullYear() - 1) + '12');
			TimeArray.push(now.getFullYear() + '01');
		    TimeArray.push(now.getFullYear() + '02');
		    TimeArray.push(now.getFullYear() + '03');
			TimeArray.push(now.getFullYear() + '04~');
			return TimeArray;
		}
		if (now.getMonth() == 10) {
			TimeArray.push('~' + now.getFullYear() + '09');
			TimeArray.push(now.getFullYear() + '10');
			TimeArray.push(now.getFullYear() + '11');
			TimeArray.push(now.getFullYear() + '12');
			TimeArray.push((now.getFullYear() + 1) + '01~');
			return TimeArray;
		}
		if (now.getMonth() == 11) {
			TimeArray.push('~' + now.getFullYear() + '10');
			TimeArray.push(now.getFullYear() + '11');
			TimeArray.push(now.getFullYear() + '12');
			TimeArray.push((now.getFullYear() + 1) + '01');
			TimeArray.push((now.getFullYear() + 1) + '02~');
			return TimeArray;
		}
		TimeArray.push('~' + now.getFullYear().toString() + (now.getMonth()-1).toString());
		TimeArray.push(now.getFullYear().toString() + now.getMonth().toString());
		TimeArray.push(now.getFullYear().toString() + (now.getMonth()+1).toString());
		TimeArray.push(now.getFullYear().toString() + (now.getMonth()+2).toString());
		TimeArray.push(now.getFullYear().toString() + (now.getMonth()+3).toString()+'~');
		return TimeArray;
	}

    initPie() {
		let pieChartData = [
			{value:0,name:"On Way"},
            {value:0,name:'In Transit at Port'},
			{value:0,name:'Ready for Departure'},
			{value:0,name:'Packed but no Shipping'},
			{value:0,name:'Preparation'}
		];
		let data = this.props.status.data;
		pieChartData[0].value=data.State1
		pieChartData[1].value=data.State2
		pieChartData[2].value=data.State3
		pieChartData[3].value=data.State4
		pieChartData[4].value=data.State5

        let myChart = echarts.init(this.refs.pieChart) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        let options = this.setPieOption(pieChartData)
        //设置options
        myChart.setOption(options)
    }

    initBar() {
		
		let barChartData = [{
			"noX":[],
			"haveX":[]
		}];
		let data = this.props.status.chartBarData;

		barChartData[0].noX.push(data.OnePlus)
		barChartData[0].noX.push(data.One)
		barChartData[0].noX.push(data.Now)
		barChartData[0].noX.push(data.NowPlus)
		barChartData[0].noX.push(data.NowPlusPlus)

		barChartData[0].haveX.push(data.OnePlusX)
		barChartData[0].haveX.push(data.OneX);
		barChartData[0].haveX.push(data.NowX);
		barChartData[0].haveX.push(data.NowPlusX);
		barChartData[0].haveX.push(data.NowPlusPlusX);

        let myChart = echarts.init(this.refs.barChart) //初始化echarts

        //我们要定义一个setBarOption函数将data传入option里面
        let options = this.setBarOption(barChartData)
        //设置options
        myChart.setOption(options)
    }

    componentDidMount() {
		// const UserID = this.props.user.loginname
		// this.props.getChartData(UserID) //获取图表数据
		
        this.initBar()
        this.initPie()
    }

    // 图表生成时，会出现“Can't get dom width or height”错误提示，原因是调用componentDidUpdate时，dom未渲染完成
    // componentDidUpdate() {
	// 	this.initBar()
    //     this.initPie()
    // }

    //一个基本的echarts图表配置函数
    setPieOption(pieChartData) {
        return {
            tooltip : {
                 trigger: 'item',
                 formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
				x: 'left',
				y: 'top',
				data: ["On Way", 'In Transit at Port', 'Ready for Departure', 'Packed but no Shipping', 'Preparation']
			},
			calculable: false,
            series: [{
                name: '',
			    type: 'pie',
				radius: '50%',
				center: ['50%', '70%'],
				position: 'center',
				itemStyle: {
                    normal: {
                        label: {
                            show: true,
							formatter: "{d} %",
						},
					    labelLine: {
							show: true,
							length: 10
						}
					},
					emphasis: {
                        label: {
                            show: true,
							position: 'center',
							textStyle: {
                                fontSize: '30',
								fontWeight: 'bold'
							}
						}
					}
				},
				data: pieChartData
			}]
        }
    }

    setBarOption(barChartData) {
        return {
            legend: {
                data: ['Order', 'Delivered']
			},
			grid: {
				x: 44,
				x2: 10,
				y: 40,
			    y2: 70
			},
			calculable: false,
			xAxis: [{
				type: 'category',
				data: this.getTimeArray(),
				axisLabel: {
                    interval: 0,
					rotate: 45
				}
			}],
			yAxis: [{
                type: 'value',
				splitArea: {
                    show: true
				}
			}],
			series: [{
                name: 'Order',
				type: 'bar',
			    itemStyle: {
                    normal: { // 系列级个性化，横向渐变填充
					    label: {
                            show: true,
							position: 'top'
					    }
					}
				},
				data: barChartData[0].noX
			}, {
				name: 'Delivered',
				type: 'bar',
				itemStyle: {
					normal: { // 系列级个性化，横向渐变填充
						label: {
							show: true,
							position: 'top'
						}
					}
				},
				data: barChartData[0].haveX
			}]
        }
    }

    render() {
        //加载框开始
        const doing = this.props.status.doing;
		let loadStatus = 'loading';
		if(!doing){
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
                <div style={doing ? style.displayNone:style.displayBlock} >
                    <div style={{textAlign:'center'}}>
                        The Statistical Graph of Delivery  
                        <div ref="barChart" style={{width: "100%",height: "300px",padding:"10px"}}></div> 
                    </div>
                    
                    <div style={{textAlign:'center'}}>
                        The Statistical Graph of status  
                        <div ref="pieChart" style={{height: "300px",padding:"10px"}}></div> 
                    </div>
                </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
