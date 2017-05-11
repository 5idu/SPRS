import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import InfiniteScroll from 'react-infinite-scroller'

export default class BodyPage extends React.Component {
    constructor(props) {
        super(props);
    }

    login = () => {
        let user = this.props.user;
        if (!user || Object.keys(user).length <= 0) {
            let uri = this.props.location.pathname;
            this.props.history.push('/login', {fromUri: uri});
            return false
        } else {
            return true
        }
    }

    componentWillMount() {
        this.login()
    }

    render() {
        return(
            <MuiThemeProvider>
                <div>
                    HomeBody
                </div>
            </MuiThemeProvider>
        )
    }
}
