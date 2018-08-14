import actionTypes from '../action_types';

export function buttonPressed(button) {
    return function (dispatch) {
        dispatch({
            type: actionTypes.USER_LOGIN,
            payload: button
        });
    };
}
