import React                  from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import BillList               from './bill-list.js';

export class LegisBillList extends React.PureComponent {

    renderLegis = (legis) => {
        return (
            <div className='legis-bills' key={legis.govtrack_id}>
                <h3>{legis.first_name} {legis.last_name}</h3>
                <BillList chamber={legis.chamber} />
            </div>
        );
    }

    render() {
        return (
            <div className='legis-bills-list'>
                {this.props.items.map(this.renderLegis)}
            </div>
        );
    }
}

LegisBillList.propTypes = {
    isRequesting: PropTypes.bool,
    items:        PropTypes.array.isRequired
};

function mapStateToProps(state, props) {
    return {
        isRequesting:  state.legis.isRequesting,
        items:         state.legis.items
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LegisBillList);
