import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

export default class QueryByPnBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    //重置输入框内容
    reset = () => {
        this.refs.textField.input.value = ""
    }

    //查询
    search = () => {
        if (this.refs.textField.input.value == '' || this.refs.textField.input.value == null) {
            this.setState({open: true});
            this.refs.textField.focus()
            return
        }
        let pn = this.refs.textField.input.value
        this.props.history.push(`/query/matnr/${pn}`);
    }

    handleRequestClose = () => {
        this.setState({
            open: false
        });
    };

    render() {

        //样式
        const style = {
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
                    <TextField
                        hintText="Entry PN#"
                        floatingLabelText="PN#"
                        fullWidth={true}
                        ref="textField"/>
                    <br/>
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
                        open={this.state.open}
                        message="PLEASE ENTER THE VALID SAP NO!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                </div>
            </MuiThemeProvider>
        )
    }
}
