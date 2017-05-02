import React             from 'react';

export class Root extends React.PureComponent {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}

export default Root;
