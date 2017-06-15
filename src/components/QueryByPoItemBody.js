import React from 'react'
import {red300, blue500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

export default class QueryByPoItemBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openPo: false,
            openItem: false
        };
    }

    //重置输入框内容
    reset = () => {
        this.refs.textFieldPo.input.value = ""
        this.refs.textFieldItem.input.value = ""
    }

    //查询
    search = () => {
        if (this.refs.textFieldPo.input.value == '' || this.refs.textFieldPo.input.value == null) {
            this.setState({openPo: true});
            this.refs.textFieldPo.focus()
            return
        }
        if (this.refs.textFieldItem.input.value == '' || this.refs.textFieldItem.input.value == null) {
            this.setState({openItem: true});
            this.refs.textFieldItem.focus()
            return
        }
        let so = this.refs.textFieldPo.input.value
        let item = this.refs.textFieldItem.input.value
        this.props.history.push(`/home/st6/${so}/${item}`);
    }

    handleRequestClose = () => {
        this.setState({
            openPo: false,
            openItem: false
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
                        ref="textFieldPo"/>
                    <br/>
                    <TextField
                        hintText="Entry Item"
                        floatingLabelText="Item"
                        fullWidth={true}
                        ref="textFieldItem"/>
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
                        open={this.state.openPo}
                        message="PLEASE ENTER THE VALID PO NO!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                    
                    <Snackbar
                        open={this.state.openItem}
                        message="PLEASE ENTER THE VALID ITEM NO!"
                        autoHideDuration={3000}
                        onRequestClose={this.handleRequestClose}/>
                </div>
            </MuiThemeProvider>
        )
    }
}
