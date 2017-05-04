import React                  from 'react';
import PropTypes              from 'prop-types';
import { connect }            from 'react-redux';
import './vote.css';

export class Vote extends React.PureComponent {
    findVoteCast(vote, legis) {
        if (!vote.results) return '';
        if (vote.results['rollcall-vote']) {
            // house
            return vote.results['rollcall-vote']['vote-data']['recorded-vote']
            .filter(v => {
                return v.legislator._attributes['name-id'] === legis.bioguide_id;
            }).map(v => v.vote._text)[0] || '';
        }
        if (vote.results['roll_call_vote']) {
            // senate
            return vote.results['roll_call_vote']['members']['member']
            .filter(m => {
                return m.lis_member_id._text === legis.lis_id;
            }).map(m => m.vote_cast._text)[0] || '';
        }
        return 'no vote';
    }

    findTitle(vote, bill) {
        if (!vote.results) return '';
        if (vote.results['roll_call_vote']) {
            // senate
            return vote.results['roll_call_vote']['vote_document_text']._text;
        }
        if (vote.results['rollcall-vote']) {
            // house
            return vote.results['rollcall-vote']['vote-metadata']['vote-question']._text
                + ': ' + vote.results['rollcall-vote']['vote-metadata']['vote-desc']._text;
        }
        if (bill) return bill.official_title;
    }

    findURL(vote, bill) {
        if (bill && bill.urls) return bill.urls.congress;
        return vote.url;
    }

    render() {
        const vote_cast = this.findVoteCast(this.props.item, this.props.legis);
        return (
            <div className='vote'>
                <h5 className={`vote-cast ${vote_cast.toLowerCase()}`}>
                    <a href={this.findURL(this.props.item, this.props.bill)}
                        className='vote-cast-url'
                        target='_blank'>
                        {vote_cast}
                    </a>
                </h5>
                <p className='vote-datetime'>
                    {this.props.item.voted_at &&
                        new Date(this.props.item.voted_at).toLocaleString()
                    }
                </p>
                <p className='vote-title'>
                    {this.findTitle(this.props.item, this.props.bill)}
                </p>
            </div>
        );
    }
}

Vote.propTypes = {
    item:         PropTypes.shape({
        roll_id:       PropTypes.string.isRequired
    }).isRequired,
    legis:        PropTypes.shape({
        chamber:       PropTypes.string.isRequired,
        bioguide_id:   PropTypes.string.isRequired,
        lis_id:        PropTypes.string
    }).isRequired,
    bill: PropTypes.shape({})
};

function mapStateToProps(state, props) {
    return {
        bill: state.bills.items
            .filter(b => b.bill_id === props.item.bill_id)[0] || {}
    };
}

function mapDispatchToProps(dispatch) {
    return {
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Vote);
