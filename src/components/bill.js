import React                  from 'react';
import PropTypes              from 'prop-types';

export default class Bill extends React.PureComponent {
    render() {
        return (
            <div className='bill'>
                {this.props.item.bill_id}
            </div>
        );
    }
}

Bill.propTypes = {
    item: PropTypes.shape({
        bill_id: PropTypes.string.isRequired
    }).isRequired
};
