import React from 'react'

import Divider from 'material-ui/Divider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import Header from '../components/Header'

export default class About extends React.Component {

    render() {
        const style = {
            headline: {
                fontSize: 24,
                marginBottom: 12,
                fontWeight: 400
            }
        }
        return (
            <MuiThemeProvider>
                <div>
                    <Header {...this.props}/>
                    <div className="main">
                        <h2 style={style.headline}>If you encounter problems:</h2>
                        <p>
                            Please send email to:<b>xugang_jis2@johnsonfitness.com</b>
                        </p>
                        <br/>
                        <Divider/>
                    </div>
                </div>
            </MuiThemeProvider>
        )
    }

}
