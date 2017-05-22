import React from 'react'
import { Link,Redirect } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';

//导入echarts
var echarts = require('echarts/lib/echarts') //必须
require('echarts/lib/chart/pie') //图表类型
require('echarts/lib/component/title') //标题插件
require('echarts/lib/component/legend')
require('echarts/lib/component/tooltip')

export default class ChartBody extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const UserID = this.props.user.loginname
        this.props.getChartData(UserID)
    }

    initPie() {
        const {chartData} = this.props.status //外部传入的data数据
        let myChart = echarts.init(this.refs.pieChart) //初始化echarts

        //我们要定义一个setPieOption函数将data传入option里面
        let options = this.setPieOption(chartData)
        //设置options
        myChart.setOption(options)
    }

    componentDidMount() {
        this.initPie()
    }

    componentDidUpdate() {
        this.initPie()
    }

    //一个基本的echarts图表配置函数
    setPieOption(chartData) {
        return {
            tooltip : {
                 trigger: 'item',
                 formatter: "{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'horizontal',
				x: 'left',
				y: 'top',
				data: ['On Way', 'In Transit at Port', 'Ready for Departure', 'Packed but no Shipping', 'Preparation']
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
				data: chartData
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
                        The Statistical Graph of status  
                    <div ref="pieChart" style={{width: "100%",height: "200px"}}></div> 
                    </div>
                </div>
                </div>
            </MuiThemeProvider>
        )
    }
}
