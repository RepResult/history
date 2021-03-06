import React                  from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import Bill                   from './bill.js';

export class BillList extends React.PureComponent {

    renderBill = (bill) => {
        return (
            <Bill key={bill.bill_id} item={bill} />
        );
    }

    render() {
        return (
            <div className='bill-list'>
                {this.props.items.map(this.renderBill)}
            </div>
        );
    }
}

BillList.propTypes = {
    isRequesting: PropTypes.bool,
    items:        PropTypes.array.isRequired,
    legis:        PropTypes.shape({
        chamber:       PropTypes.string.isRequired,
        bioguide_id:   PropTypes.string.isRequired
    }).isRequired
};

function mapStateToProps(state, props) {
    return {
        isRequesting:  state.bills.isRequesting,
        items:         state.bills.items
            .filter(b => b.chamber === props.legis.chamber)
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(BillList);
