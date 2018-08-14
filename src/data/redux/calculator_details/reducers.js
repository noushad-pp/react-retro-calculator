import actionTypes from '../action_types';
import initialStates from './states';

export default function calculator_details(state = initialStates.calculator_details, action) {
    switch (action.type) {
        case actionTypes.USER_LOGIN: {
            return {
                ...state,
                user: {
                    name: "John Doe"
                }
            };
        }

        default:
            return state;
    }
}
