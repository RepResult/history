import { applyMiddleware } from 'redux';
import thunkMiddleware     from 'redux-thunk';
import logger              from './logger.js';

const middlewares = applyMiddleware(
    thunkMiddleware,
    logger
);

export default middlewares;
