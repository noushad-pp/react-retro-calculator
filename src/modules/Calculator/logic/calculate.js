import { operations } from '../../../data/config/constants';

function joinOpearandArray(arr) {
    return arr.join("");
}

function resetState(resultState, memory_clear = false) {
    //second parameter memory_clear differentiate between C and AC buttons
    let state = {
        ...resultState,
        display_text: 0,
        curr_stage: 0,
        operand_1: [0],
        operand_2: [],
        result: undefined,
        operation: undefined,
        memory_var: memory_clear ? undefined : resultState.memory_var,
        float_enabled: false,
        sign_negated: false
    };
    return state;
}

function addDigit(result_state, digit) {
    //find which operand and push incoming digit to operand value array
    let changing_operand = [...result_state[`operand_${result_state.curr_stage + 1}`]];
    let message = result_state.message;
    if (changing_operand.toString() === "0" && digit !== ".") {
        changing_operand = [digit];
    } else if (changing_operand.length < 9) {
        changing_operand.push(digit);
    }

    let state = {
        ...result_state,
        [`operand_${result_state.curr_stage + 1}`]: changing_operand,
        display_text: joinOpearandArray(changing_operand),
        message: message
    };
    return state;
}

function convertToPercentage(result_state) {
    let changing_operand = [...result_state[`operand_${result_state.curr_stage + 1}`]];
    if (changing_operand.length && changing_operand !== ['-']) {
        let val = parseFloat(changing_operand.join(""));
        changing_operand = (val * 0.01).toString().substring(0, 9).split("");
    }
    return {
        ...result_state,
        [`operand_${result_state.curr_stage + 1}`]: changing_operand,
        display_text: joinOpearandArray(changing_operand)
    };
}

function convertToSquareroot(result_state) {
    let changing_operand = [...result_state[`operand_${result_state.curr_stage + 1}`]];
    if (changing_operand.length && changing_operand !== ['-']) {
        let val = parseFloat(changing_operand.join(""));
        changing_operand = Math.sqrt(val).toString().substring(0, 9).split("");
    }
    return {
        ...result_state,
        [`operand_${result_state.curr_stage + 1}`]: changing_operand,
        display_text: joinOpearandArray(changing_operand)
    };
}

function negateOperand(result_state) {
    let changing_operand = [...result_state[`operand_${result_state.curr_stage + 1}`]];
    let sign_negated = true;
    if (changing_operand[0] === "-") {
        sign_negated = false;
        changing_operand.shift();
    } else {
        changing_operand.unshift("-");
    }

    let state = {
        ...result_state,
        sign_negated,
        [`operand_${result_state.curr_stage + 1}`]: changing_operand,
        display_text: joinOpearandArray(changing_operand)
    };

    return state;
}

function memAction(type, result_state) {
    let result = result_state.result;
    let operand_1 = [...result_state.operand_1];
    let operand_2 = [...result_state.operand_2];
    let display_text = result_state.display_text;

    if (result_state.memory_var) {
        if (result_state.operand_1 && result_state.operand_1.length > 0 && result_state.operand_1.toString !== "-") {
            result = (type === 'add') ? result_state.memory_var + parseFloat(operand_1.join("")) : parseFloat(operand_1.join("")) - result_state.memory_var;
            operand_1 = result.toString().substring(0, 9).split("");
            operand_2 = [];
            display_text = result;
        }
    }
    return {
        ...result_state,
        operand_1,
        operand_2,
        result,
        display_text,
    };
}

function compute(result_state) {
    let result = result_state.result;
    let display_text = result_state.display_text;
    let message = result_state.message;
    let operand_1 = [...result_state.operand_1];
    let operand_2 = [...result_state.operand_2];
    let curr_stage = [...result_state.curr_stage];
    let operator = [...result_state.operator];
    let var_1 = parseFloat(operand_1.join(""));
    let var_2 = parseFloat(operand_2.join(""));
    let error = false;

    if ((var_1 || var_1 === 0) && (var_2 || var_2 === 0) && operand_1 && result_state.operator && operand_2) {
        switch (result_state.operator) {
            case operations.ADDITION:
                result = var_1 + var_2;
                break;

            case operations.SUBSTRACTION:
                result = var_1 - var_2;
                break;

            case operations.MULTIPLICATION:
                result = var_1 * var_2;
                break;

            case operations.DIVISION:
                if (var_2 !== 0) {
                    result = var_1 / var_2;
                } else {
                    display_text = "error";
                    message = "Cant divide by zero";
                    error = true;
                    operand_1 = [];
                    operand_2 = [];
                    curr_stage = 0;
                    operator = undefined;
                }
                break;
        }
    }

    if (!error && result) {
        display_text = result.toString().substring(0, 9);
        operand_1 = display_text.split("");
        operand_2 = [];
    }

    return {
        ...result_state,
        operand_1,
        operand_2,
        curr_stage,
        operator,
        result,
        display_text,
        message
    };
}

export default function calculate(buttonName, operation, state) {
    let result_state = { ...state };

    //check if poweroff
    if (!state.power) {
        if (operation === operations.ALL_CLEAR) {
            result_state.power = true;
            result_state.display_text = 0;
        } else {
            result_state.message = "Power on the calculator first";
        }
    } else if (buttonName || buttonName === 0) {
        switch (operation) {
            case operations.POWER_OFF: {
                result_state = resetState(result_state, true);
                result_state.power = false;
                break;
            }

            case operations.ALL_CLEAR: {
                result_state = resetState(result_state, true);
                break;
            }

            case operations.CLEAR: {
                result_state = resetState(result_state, false);
                break;
            }

            case operations.DIGIT: {
                let val = parseInt(buttonName, 10);
                result_state = addDigit(result_state, val);
                break;
            }

            case operations.FLOAT: {
                let changing_operand = [...result_state[`operand_${result_state.curr_stage + 1}`]];
                if (changing_operand.indexOf(".") === -1) {
                    if (changing_operand.length === 0 || changing_operand.toString() === "0") {
                        result_state = addDigit(result_state, 0);
                    }
                    result_state = addDigit(result_state, ".");
                }
                break;
            }

            case operations.MODULUS: {
                result_state = convertToPercentage(result_state);
                break;
            }

            case operations.SQUARE_ROOT: {
                result_state = convertToSquareroot(result_state);
                break;
            }

            case operations.SIGN_CHANGE: {
                result_state = negateOperand(result_state);
                break;
            }

            case operations.MEM_RECORD: {
                if (result_state.operand_1.length > 0 && result_state.operand_1.toString() !== '-') {
                    result_state.memory_var = parseFloat(result_state.operand_1.join(""));
                }
                break;
            }

            case operations.MEM_CLEAR: {
                result_state.memory_var = undefined;
                break;
            }

            case operations.MEM_ADD: {
                result_state = memAction('add', result_state);
                break;
            }

            case operations.MEM_SUBSTRACT: {
                result_state = memAction('sub', result_state);
                break;
            }

            case operations.COMPUTE: {
                result_state = compute(result_state);
                break;
            }

            default: {
                result_state.curr_stage = 1;
                if (result_state.operand_1.length > 0 && result_state.operand_2.length > 0 && result_state.operator) {
                    result_state = compute(result_state);
                }
                result_state.operator = operation;
                break;
            }
        }
    }

    return result_state;
}
