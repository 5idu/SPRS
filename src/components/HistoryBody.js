import React from 'react'
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
        this.state={
            openPn: false,
            openStartDate: false,
            openEndDate: false
        }
    }

    //重置输入框内容
    reset = () => {
        this.refs.textFieldPn.input.value = ""
        this.refs.datePickerStartDate.refs.input.input.defaultValue = ""
        this.refs.datePickerEndDate.refs.input.input.defaultValue = ""
        this.refs.radioGroup.state.selected = "radioList"
    }

    //查询
    search = () => {
        if (this.refs.textFieldPn.input.value == '' || this.refs.textFieldPn.input.value == null) {
            this.setState({openPn: true});
            this.refs.textFieldPn.focus()
            return
        }
        if (this.refs.datePickerStartDate.refs.input.input.defaultValue == '' || this.refs.datePickerStartDate.refs.input.input.defaultValue == null) {
            this.setState({openStartDate: true});
            return
        }
        if (this.refs.datePickerEndDate.refs.input.input.defaultValue == '' || this.refs.datePickerEndDate.refs.input.input.defaultValue == null) {
            this.setState({openEndDate: true});
            return
        }
        // let pn = this.refs.textField.input.value
        // this.props.history.push(`/query/matnr/${pn}`);
    }

    handleRequestClose = () => {
        this.setState({
            openPn: false,
            openStartDate: false,
            openEndDate: false
        });
    };

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

        return (
            <MuiThemeProvider>
                <div>
                    <div
                        style={{
                        textAlign: "center"
                    }}>Total Shipout Qty by PN#</div>
                    <div>
                        <RadioButtonGroup name="radioGroup" defaultSelected="radioList" ref="radioGroup">
                            <RadioButton value="radioList" label="By List" style={style.radioButton}/>
                            <RadioButton
                                value="radioChart"
                                label="By Trend Chart"
                                style={style.radioButton}
                            />
                        </RadioButtonGroup>
                    </div>
                    <TextField
                        hintText="Entry PN#"
                        floatingLabelText="PN#"
                        fullWidth={true}
                        ref="textFieldPn"/>                 
                    <DatePicker hintText="Start date" ref="datePickerStartDate" fullWidth={true}/>
                    <DatePicker hintText="End date" ref="datePickerEndDate" fullWidth={true}/>
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
                        message="SAP NO. CANNOT BE BLANK!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                    <Snackbar
                        open={this.state.openStartDate}
                        message="STARTING TIME CANNOT BE BLANK!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                    <Snackbar
                        open={this.state.openEndDate}
                        message="END TIME CANNOT BE BLANK!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                </div>
            </MuiThemeProvider>
        )
    }
}
