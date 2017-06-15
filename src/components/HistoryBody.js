import React from 'react'
import {red300, blue500, grey50, grey900} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton'
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';

export default class HistoryBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            radioCheck: "radioList",
            openPn: false,
            openStartDate: false,
            openEndDate: false,
            openCheckDate: false,
            startDate: null,
            endDate: null
        }
    }

    //重置输入框内容
    reset = () => {
        this.refs.textFieldPn.input.value = ""
        this.setState({startDate: null})
        this.setState({endDate: null})
        this.setState({radioCheck: "radioList"});
    }

    //查询
    search = () => {
        if (this.refs.textFieldPn.input.value == '' || this.refs.textFieldPn.input.value == null) {
            this.setState({openPn: true});
            this
                .refs
                .textFieldPn
                .focus()
            return
        }
        if (this.refs.datePickerStartDate.refs.input.props.value == '' || this.refs.datePickerStartDate.refs.input.props.value == null) {
            this.setState({openStartDate: true});
            return
        }
        if (this.refs.datePickerEndDate.refs.input.props.value == '' || this.refs.datePickerEndDate.refs.input.props.value == null) {
            this.setState({openEndDate: true});
            return
        }
        if (this.refs.datePickerStartDate.refs.input.props.value>this.refs.datePickerEndDate.refs.input.props.value){
            this.setState({openCheckDate: true});
            return
        }

        let userID = this.props.user.loginname
        let beginTime = this.refs.datePickerStartDate.refs.input.props.value
        let overTime = this.refs.datePickerEndDate.refs.input.props.value
        let LiaoNum = this.refs.textFieldPn.input.value
        let type
        if(this.refs.radioGroup.state.selected == 'radioList'){
            type = '1'
            this.props.history.push(`/historys/listSearch/${type}/${beginTime}/${overTime}/${LiaoNum}`);
        }else {
            type = '2'
            this.props.getTrendChartData(userID, type, beginTime, overTime, LiaoNum);
            this.props.history.push(`/historys/trendChart/${type}/${beginTime}/${overTime}/${LiaoNum}`);
        }    
    }

    handleRequestClose = () => {
        this.setState({openPn: false, openStartDate: false, openEndDate: false, openCheckDate: false});
    };

    _handleStartInput = (event, date) => {
        this.setState({startDate: date});
    }

    _handleEndInput = (event, date) => {
        this.setState({endDate: date});
    }

    _handleRadioInput = (event, value) => {
        this.setState({radioCheck: value});
    }

    render() {
        const style = {
            radioButton: {
                margin: 12
            },
            div: {
                textAlign: "center"
            },
            button: {
                margin: 12
            }
        };

        const muiTheme = getMuiTheme({
            raisedButton:{
                primaryColor: blue500, 
                secondaryColor: red300
            },
            textField: {
                focusColor: blue500
            },
            radioButton: {   
                checkedColor: blue500
            }
		});

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <div
                        style={{
                        textAlign: "center"
                    }}>Total Shipout Qty by PN#</div>
                    <div>
                        <RadioButtonGroup
                            name="radioGroup"
                            valueSelected={this.state.radioCheck}
                            ref="radioGroup"
                            onChange={this._handleRadioInput}>
                            <RadioButton 
                                value="radioList" 
                                label="By List" 
                                style={style.radioButton}/>
                            <RadioButton
                                value="radioChart"
                                label="By Trend Chart"
                                style={style.radioButton}/>
                        </RadioButtonGroup>
                    </div>
                    <TextField
                        hintText="Entry PN#"
                        floatingLabelText="PN#"
                        fullWidth={true}
                        ref="textFieldPn"/>
                    <DatePicker
                        autoOk={true}
                        hintText="Start date"
                        ref="datePickerStartDate"
                        fullWidth={true}
                        value={this.state.startDate}
                        onChange={this._handleStartInput}/>
                    <DatePicker
                        autoOk={true}
                        hintText="End date"
                        ref="datePickerEndDate"
                        fullWidth={true}
                        value={this.state.endDate}
                        onChange={this._handleEndInput}/>
                    <div style={style.div}>
                        <RaisedButton
                            label="Search"
                            primary={true}
                            style={style.button}
                            onTouchTap={this.search}/>
                        <RaisedButton
                            label="Reset"
                            secondary={true}
                            style={style.button}
                            onTouchTap={this.reset}/>
                    </div>
                    <Snackbar
                        open={this.state.openPn}
                        message="SAP NO. cannot be blank!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                    <Snackbar
                        open={this.state.openStartDate}
                        message="Start date cannot be blank!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                    <Snackbar
                        open={this.state.openEndDate}
                        message="End date cannot be blank!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                    <Snackbar
                        open={this.state.openCheckDate}
                        message="Start date cannot be greater than end date!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                </div>
            </MuiThemeProvider>
        )
    }
}
