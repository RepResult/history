import React from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { doGetLegis }         from './actions/legis-actions.js';
import { doGetBills }         from './actions/bill-actions.js';
import LegisBillList from './components/legis-bill-list.js';
import './App.css';

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            refreshed: null
        };
    }
    componentWillMount() {
        this.getData();
    }
    componentWillUpdate() {
        this.getData();
    }
    render() {
        return (
            <div className='app'>
                <div className='app-header'>
                    <h1>⇄ RepResult</h1>
                </div>
                <p className='app-intro'>
                </p>
                <LegisBillList />
            </div>
        );
    }

    getData = () => {
        if (!this.props.citizen.geo.lat && !this.props.citizen.zip) {
            return;
        }
        if (this.state.refreshed > new Date().setHours(0)) {
            return;
        }
        this.setState({ refreshed: new Date() });
        this.props.actions.doGetBills();
        this.props.actions.doGetLegis();
    }
}

App.propTypes = {
    isRequesting: PropTypes.bool,
    citizen:      PropTypes.shape({
        geo: PropTypes.object.isRequired
    }),
    actions:      PropTypes.shape({
        doGetBills:     PropTypes.func.isRequired,
        doGetLegis:     PropTypes.func.isRequired
    }).isRequired
};

function mapStateToProps(state) {
    return {
        citizen:       state.citizen,
        isRequesting:  state.legis.isRequesting || state.bills.isRequesting
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            doGetLegis,
            doGetBills
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
