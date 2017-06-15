import React from 'react';
import { Link,Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { clearUser } from '../store/actions';
import {red500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionAccountCircle from 'material-ui/svg-icons/action/account-circle';
import ActionSuperAccount from 'material-ui/svg-icons/action/supervisor-account';
import ActionFeedback from 'material-ui/svg-icons/action/feedback';
import SubdirectoryArrowLeft from 'material-ui/svg-icons/navigation/subdirectory-arrow-left';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import Drawer from 'material-ui/Drawer';
import Paper from 'material-ui/Paper';
import Menu from 'material-ui/Menu';
import SocialPersonOutline from 'material-ui/svg-icons/social/person-outline';
import ActionSearch from 'material-ui/svg-icons/action/search';
import ActionHistory from 'material-ui/svg-icons/action/history';
import Divider from 'material-ui/Divider';
import EditorInsertChart from 'material-ui/svg-icons/editor/insert-chart';

class head extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
		  open: false,
		  title: this.props.routeName
		}
	}

	handleToggle = () => this.setState({open: !this.state.open});

	handleClose = () => this.setState({open: false});

	changeOpen = (open) => {
		this.setState({open: open});
	}

	login = () => {
		this.handleClose();
		let uri = this.props.location.pathname;
		this.props.history.push('/login',{fromUri:uri});
	}

	logout = () => {
		this.handleClose();
		this.props.clearUser();
		let uri = this.props.location.pathname;
		this.props.history.push('/login',{fromUri:uri});
	}

	showChart=()=> {
		 this.props.history.push('/chart');
	}

	render(){

		const user = this.props.user
		let login = false

		let logoutStyle = {}
		let loginStyle = {}
		if(user && Object.keys(user).length > 0){
			loginStyle ={
				display:'none'
			}
			login = true
		}else{
			logoutStyle = {
				display:'none'
			}
		}

		const muiTheme = getMuiTheme({
			palette: {
				primary1Color: red500
  		}
		});

		return (
			<MuiThemeProvider muiTheme={muiTheme}>
				<div>
					<AppBar
						iconElementLeft={<IconButton><NavigationMenu/></IconButton>}
						onLeftIconButtonTouchTap={this.handleToggle}
						showMenuIconButton={this.state.title=='Login' ? false : true}
						title={this.state.title}
						titleStyle={{textAlign: 'center',fontSize:'20px'}}
						iconElementRight={this.state.title=='Home' ? <IconButton><EditorInsertChart/></IconButton> : <div></div>}
						style={{position: 'fixed',width:'100%'}}
						onRightIconButtonTouchTap={this.showChart}
					/>
					<Drawer
			          docked={false}
			          width={200}
			          open={this.state.open}
			          onRequestChange={this.changeOpen}
			        >
					      <Menu>
									<div style={logoutStyle}>
						        <MenuItem primaryText={user.loginname} leftIcon={<ActionAccountCircle />} />	
										<MenuItem primaryText={'123'} leftIcon={<ActionSuperAccount />} />			    					        
					        </div>
									<Divider />
					        <Link to="/home" onTouchTap={this.handleClose}>
					        	<MenuItem primaryText="Home" leftIcon={<ActionHome />} />
					        </Link>
					        <Link to="/query" onTouchTap={this.handleClose}>
					        	<MenuItem primaryText="Query" leftIcon={<ActionSearch />} />
					        </Link>
					        <Link to="/historys" onTouchTap={this.handleClose}>
					        	<MenuItem primaryText="History" leftIcon={<ActionHistory />} />
					        </Link>
					        <Link to="/about" >
					        	<MenuItem primaryText="About" leftIcon={<ActionFeedback />} />
					        </Link>
									<Divider />
									<div style={loginStyle}>
						        <MenuItem onTouchTap={this.login} primaryText="Login" leftIcon={<SocialPersonOutline />} />					        
						      </div>
					        <div style={logoutStyle}>			    
						        <MenuItem onTouchTap={this.logout} primaryText='Logout' leftIcon={<SubdirectoryArrowLeft />} />						        
					        </div>
					      </Menu>
			        </Drawer>
		        </div>
			</MuiThemeProvider>
		)
	}
}


const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearUser: () => {
      dispatch(clearUser())
    }
  }
}

const Header = connect(
  mapStateToProps,
  mapDispatchToProps
)(head)

export default Header;

