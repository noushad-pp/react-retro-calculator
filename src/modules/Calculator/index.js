import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Display from "./components/display";
import ButtonPanel from "./components/buttonpanel";
import calculate from "./logic/calculate";

import './index.scss';

import * as CONSTANTS from '../../data/config/constants';
import * as pageActions from '../../data/redux/page_details/actions';

function mapStateToProps(state) {
    return {
        page_details: state.page_details,
        calculator_details: state.calculator_details
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
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

    handleClick = buttonName => {
        this.setState(calculate(this.state, buttonName));
    };

    render() {
        return (
            <div className="CalculatorContainer flex-column flex-center full-flex pad-30">
                <div className="flex-column pad-10 flex-jc calculator">
                    <div className="flex-row flex-jsb solarContainer b-pad-5">
                        <div className="brandName full-flex font-md is-font-bold t-pad-10 l-pad-15">CASIO</div>
                        <div className="solarPanelContainer full-flex flex-ac flex-column">
                            <div className="solarPanel full-flex">&nbsp;</div>
                            <div className="text font-xs t-pad-5">TWO WAY POWER</div>
                        </div>
                    </div>
                    <div className="flex-column displayContainer">
                        <Display value={this.state.next || this.state.total || "0"} />
                    </div>
                    <div className="flex-column buttonPanelContainer">
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
