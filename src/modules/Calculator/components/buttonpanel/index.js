import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../button";
import { operations } from '../../../../data/config/constants';

class ButtonPanel extends Component {
    handleClick = (buttonName, operation) => {
        this.props.clickHandler(buttonName, operation);
    };

    render() {
        return (
            <div className="flex-column buttonPanel">
                <div className="buttonRow flex-row flex-jsb flex-ac">
                    <span className="font-sm full-flex lr-pad-15 is-font-bold">SL-3005V</span>
                    <div className="flex-row flex-jse">
                        <Button clickHandler={this.handleClick} name="&radic;" operation={operations.SQUARE_ROOT} className="small"/>
                        <Button clickHandler={this.handleClick} name="OFF" operation={operations.POWER_OFF} className="small"/>
                    </div>
                </div>
                <div className="flex-row flex-jsb">
                    <Button clickHandler={this.handleClick} name="MC" operation={operations.MEM_CLEAR}/>
                    <Button clickHandler={this.handleClick} name="MR" operation={operations.MEM_RECORD}/>
                    <Button clickHandler={this.handleClick} name="M+" operation={operations.MEM_ADD}/>
                    <Button clickHandler={this.handleClick} name="M-" operation={operations.MEM_SUBSTRACT}/>
                    <Button clickHandler={this.handleClick} name="&divide;" operation={operations.DIVISION}/>
                </div>
                <div className="flex-row flex-jsb">
                    <Button clickHandler={this.handleClick} name="%" operation={operations.MODULUS}/>
                    <Button clickHandler={this.handleClick} name={7} operation={operations.DIGIT}/>
                    <Button clickHandler={this.handleClick} name={8} operation={operations.DIGIT}/>
                    <Button clickHandler={this.handleClick} name={9} operation={operations.DIGIT}/>
                    <Button clickHandler={this.handleClick} name="&#10005;" operation={operations.MULTIPLICATION}/>
                </div>
                <div className="flex-row flex-jsb">
                    <Button clickHandler={this.handleClick} name="+/-" operation={operations.SIGN_CHANGE
                    } />
                    <Button clickHandler={this.handleClick} name={4} operation={operations.DIGIT}/>
                    <Button clickHandler={this.handleClick} name={5} operation={operations.DIGIT}/>
                    <Button clickHandler={this.handleClick} name={6} operation={operations.DIGIT}/>
                    <Button clickHandler={this.handleClick} name="&minus;" operation={operations.SUBSTRACTION}/>
                </div>
                <div className="flex-row flex-jsb">
                    <div className="flex-column">
                        <div className="flex-row flex-jsb">
                            <Button clickHandler={this.handleClick} name="C" className="red" operation={operations.CLEAR}/>
                            <Button clickHandler={this.handleClick} name={1} operation={operations.DIGIT}/>
                            <Button clickHandler={this.handleClick} name={2} operation={operations.DIGIT}/>
                            <Button clickHandler={this.handleClick} name={3} operation={operations.DIGIT}/>
                        </div>
                        <div className="flex-row flex-jsb">
                            <div className="flex-column flex-ac is-relative">
                                <Button clickHandler={this.handleClick} name="AC" className="red onBtn"   operation={operations.ALL_CLEAR}/>
                                <span className="is-absolute help-text font-xs">ON</span>
                            </div>
                            <Button clickHandler={this.handleClick} name={0} operation={operations.DIGIT}/>
                            <Button clickHandler={this.handleClick} name="." operation={operations.FLOAT}/>
                            <Button clickHandler={this.handleClick} name="=" operation={operations.COMPUTE}/>
                        </div>
                    </div>
                    <Button clickHandler={this.handleClick} name="+" className="full-flex tall" operation={operations.ADDITION}/>
                </div>
            </div>
        );
    }
}

ButtonPanel.propTypes = {
    clickHandler: PropTypes.func,
};

export default ButtonPanel;
