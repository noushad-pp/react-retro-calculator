import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import Display from "./components/display";
import ButtonPanel from "./components/buttonpanel";
import calculate from "./logic/calculate";

import 'react-toastify/dist/ReactToastify.css';
import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';
import * as calculatorActions from '../../data/redux/calculator_details/actions';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        calculator_details: state.calculator_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions, calculatorActions), dispatch)
    };
}

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: null,
            next: null,
            operation: null,
        };
    }

    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.calculator);
    }

    componentWillReceiveProps(nxtProps) {
        if (nxtProps.calculator_details !== this.props.calculator_details) {
            if (nxtProps.calculator_details.message !== this.props.calculator_details.message) {
                toast(nxtProps.calculator_details.message);
            }
        }
    }

    handleClick = (buttonName, operation) => {
        const { calculator_details } = this.props;
        let result = calculate(buttonName, operation, calculator_details);
        this.props.actions.setCalculatorState(result);
    };

    render() {
        const { calculator_details } = this.props;

        return (
            <div className="CalculatorContainer flex-column flex-center full-flex pad-30">
                <ToastContainer autoClose={1500}/>
                <div className="flex-column flex-jc calculator t-pad-20 b-pad-10">
                    <div className="shadows">
                        <div className="shadowLines leftBorderLine">&nbsp;</div>
                        <div className="shadowLines topBorderLine">&nbsp;</div>
                        <div className="shadowLines rightBorderLine">&nbsp;</div>
                        <div className="shadowLines bottomBorderLine">&nbsp;</div>
                    </div>
                    <div className="flex-row flex-jsb solarContainer b-pad-5 r-pad-10">
                        <div className="brandName full-flex font-lg is-font-bold t-pad-10 l-pad-10">CASIO</div>
                        <div className="solarPanelContainer full-flex flex-ac flex-column">
                            <div className="solarPanel full-flex">&nbsp;</div>
                            <div className="text font-xs">TWO WAY POWER</div>
                        </div>
                    </div>
                    <div className="flex-column displayContainer b-mrgn-15">
                        <Display value={calculator_details.display_text} power={calculator_details.power} memory={calculator_details.memory_var}/>
                    </div>
                    <div className="flex-column buttonPanelContainer b-pad-10">
                        <ButtonPanel clickHandler={this.handleClick} />
                    </div>
                </div>
            </div>
        );
    }
}

Calculator.propTypes = {
    page_details: PropTypes.object,
    calculator_details: PropTypes.object,
    actions: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(Calculator);
