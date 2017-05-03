import React                  from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import Vote                   from './vote.js';
import './vote-list.css';

export class VoteList extends React.PureComponent {

    renderVote = (vote) => {
        return (
            <Vote key={vote.roll_id} item={vote} legis={this.props.legis} />
        );
    }

    render() {
        return (
            <div className='vote-list'>
                {this.props.items.map(this.renderVote)}
            </div>
        );
    }
}

VoteList.propTypes = {
    isRequesting: PropTypes.bool,
    items:        PropTypes.array.isRequired,
    legis:        PropTypes.shape({
        chamber:       PropTypes.string.isRequired,
        bioguide_id:   PropTypes.string.isRequired
    }).isRequired
};

function mapStateToProps(state, props) {
    return {
        isRequesting:  state.votes.isRequesting,
        items:         state.votes.items
            .filter(b => b.chamber === props.legis.chamber)
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VoteList);
