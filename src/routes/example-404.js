import React from 'react';

class FourOFour extends React.PureComponent {

    render() {
        return (
            <div className='404'>
                <h1 className='404-title'>
                    404: You lost!
                </h1>
                <a href='/' rel='home'>Go home</a>
            </div>
        );
    }
}

export default FourOFour;
