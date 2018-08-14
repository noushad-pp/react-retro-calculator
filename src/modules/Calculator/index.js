import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
    componentWillMount() {
        this.props.actions.pageChanged(CONSTANTS.appPages.calculator);
    }

    render() {
        return (
            <div className="CalculatorContainer page-container flex-column flex-center full-flex">
                <div className="full-flex">
                    <h1 className="pad-30 font-30">Calculator will be loaded here</h1>
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
