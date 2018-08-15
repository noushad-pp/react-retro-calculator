import actionTypes from '../action_types';

export function setCalculatorState(state) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.SET_STATE,
            payload: state
        });
    };
}
