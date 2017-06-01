var status={chartData:[{
				"pieChartData":
					[{value:0,name:"On Way"},{value:0,name:'In Transit at Port'},
					{value:0,name:'Ready for Departure'},
					{value:0,name:'Packed but no Shipping'},
					{value:0,name:'Preparation'}],
				"barChartData":[{
					"noX":[],
					"haveX":[]
				}]
			}]
};
var a=status.chartData[0].barChartData
var b={}
//b.push('1')
console.log(b instanceof Array);