import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';

export default class FPQueryBody extends React.Component {
    constructor(props) {
        super(props);
    }

    getStateTable(args) {
        if (args === 'PO') {
            this
                .props
                .history
                .push('/fpquery/po');
            return;
        }
        if (args === 'PO+Item') {
            this
                .props
                .history
                .push('/fpquery/po&item');
            return;
        }
        if (args === 'PN#') {
            this
                .props
                .history
                .push('/fpquery/pn');
            return;
        }
        if (args === 'Description') {
            this
                .props
                .history
                .push('/fpquery/description');
            return;
        }
    }

    render() {

        const doing = this.props.status.doing;

        const style = {
            displayNone: {
                display: 'none'
            },
            displayBlock: {
                display: 'block'
            }
        };

        return (
            <MuiThemeProvider>
                <div>
                    <List>
                        <Subheader
                            style={{
                            textAlign: 'center'
                        }}>Order</Subheader>
                        <ListItem
                            primaryText="Query by PO number"
                            onClick={() => this.getStateTable('PO')}/>
                        <Divider/>
                        <ListItem
                            primaryText="Query by PO+Item number"
                            onClick={() => this.getStateTable('PO+Item')}/>
                        <Divider/>
                        <ListItem primaryText="Query by PN#" onClick={() => this.getStateTable('PN#')}/>
                        <Divider/>
                        <ListItem
                            primaryText="Query by Description"
                            onClick={() => this.getStateTable('Description')}/>
                    </List>
                </div>
            </MuiThemeProvider>
        )
    }
}
