import actionTypes from '../action_types';
import initialStates from './states';

export default function calculator_details(state = initialStates.calculator_details, action) {
    switch (action.type) {
        case actionTypes.SET_STATE: {
            const curr_state = action.payload ? action.payload : state;
            return curr_state;
        }

        default:
            return state;
    }
}
