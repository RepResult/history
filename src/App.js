import React from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';
import { doGetLegis }         from './actions/legis-actions.js';
import { doGetBills }         from './actions/bill-actions.js';
import { doGetVotes }         from './actions/vote-actions.js';
import { doGeocode  }         from './actions/geo-actions.js';
import LegisBillList from './components/legis-bill-list.js';
import './App.css';

class App extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            refreshed: null,
            address: ''
        };
    }
    handleChangeAddress = () => {
        this.setState(Object.assign({}, this.state, {
            address: this.refs.address.value
        }));
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.actions.doGeocode(this.state.address);
    }
    componentWillMount() {
        this.getData();
    }
    componentDidUpdate() {
        this.getData();
    }
    render() {
        return (
            <div className='app'>
                <div className='app-header'>
                    <h1>⇄ RepResult</h1>
                    <small>
                        Discover the results of your representative's vote
                    </small>
                </div>
                <div className='app-intro'>
                    <form onSubmit={this.handleSubmit}>
                        <p>
                            Your address
                        </p>
                        <label>Address
                            <input type='text'
                                ref='address'
                                value={this.state.address}
                                onChange={this.handleChangeAddress}
                            />
                        </label>
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                </div>
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
        this.props.actions.doGetVotes();
    }
}

App.propTypes = {
    isRequesting: PropTypes.bool,
    citizen:      PropTypes.shape({
        geo: PropTypes.object.isRequired
    }),
    actions:      PropTypes.shape({
        doGetBills:     PropTypes.func.isRequired,
        doGetVotes:     PropTypes.func.isRequired,
        doGeocode:      PropTypes.func.isRequired,
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
            doGetVotes,
            doGeocode,
            doGetBills
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
