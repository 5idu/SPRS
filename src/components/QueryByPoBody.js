import React from 'react'
import {red300, blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

export default class QueryByPoBody extends React.Component {
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
        }else{
            let so = this.refs.textField.input.value
            this.props.history.push(`/home/st6/${so}`);
        }
    }

    handleRequestClose = () => {
        this.setState({open: false});
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

        const muiTheme = getMuiTheme({
            raisedButton:{
                primaryColor: blue500, 
                secondaryColor: red300
            },
            textField: {
                focusColor: blue500
            }
		});

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div>
                    <TextField
                        hintText="Entry PO"
                        floatingLabelText="PO"
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
                        message="PLEASE ENTER THE VALID PO NO!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                </div>
            </MuiThemeProvider>
        )
    }
}
