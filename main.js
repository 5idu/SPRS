if(data.order == ''){
                dispatch(doneStatus({
				    doing: false,
				    trendChartData: {}
			    }))
            }else{
                dispatch(doneStatus({
				    doing: false,
				    trendChartData: data
			    }))
            }