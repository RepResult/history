const logger = store => next => action => {
    if (window.DEBUG)
        console.log('dispatching', action);
    let result = next(action);
    if (window.DEBUG)
        console.log('next state', store.getState());
    return result;
};

export default logger;
