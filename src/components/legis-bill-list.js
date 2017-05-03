import React                  from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import VoteList               from './vote-list.js';
import './legis-bill-list.css';

export class LegisBillList extends React.PureComponent {

    getLegisLink(legis) {
        if (legis.contact_form) return legis.contact_form;
        return `https://www.govtrack.us/congress/members/${legis.govtrack_id}`;
    }

    renderLegis = (legis) => {
        return (
            <div className='legis-bills' key={legis.govtrack_id}>
                <h3 className='legis-name'>
                    <a className='legis-contact-form'
                        href={this.getLegisLink(legis)}
                        target='_blank'>
                        {legis.title}. {legis.first_name} {legis.last_name}
                    </a>
                </h3>
                <VoteList legis={legis} />
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
