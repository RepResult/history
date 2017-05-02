import React          from 'react';
import ReactDOM       from 'react-dom';
import {
    browserHistory,
    Route,
    Router,
    IndexRoute }      from 'react-router';
import { Provider }   from 'react-redux';
import App            from './App.js';
import Root           from './routes/root.js';
import FourOFour      from './routes/example-404.js';
import configureStore from './stores/index.js';
import './index.css';

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory} >
            <Route path='/' component={Root}>
                <IndexRoute component={App} />
                <Route path='*' component={FourOFour}/>
            </Route>
        </Router>
    </Provider>,
    document.getElementById('root')
);
