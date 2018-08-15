import React, { Component } from "react";
import PropTypes from "prop-types";

import Button from "../button";

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
                        <Button clickHandler={this.handleClick} name="&radic;" operation="square_root" className="small"/>
                        <Button clickHandler={this.handleClick} name="OFF" operation="power_off" className="small"/>
                    </div>
                </div>
                <div className="flex-row flex-jsb">
                    <Button clickHandler={this.handleClick} name="MC" operation="mem_clear"/>
                    <Button clickHandler={this.handleClick} name="MR" operation="mem_record"/>
                    <Button clickHandler={this.handleClick} name="M+" operation="mem_add"/>
                    <Button clickHandler={this.handleClick} name="M-" operation="mem_substract"/>
                    <Button clickHandler={this.handleClick} name="&divide;" operation=""/>
                </div>
                <div className="flex-row flex-jsb">
                    <Button clickHandler={this.handleClick} name="%" operation="modulus"/>
                    <Button clickHandler={this.handleClick} name={7} operation="digit"/>
                    <Button clickHandler={this.handleClick} name={8} operation="digit"/>
                    <Button clickHandler={this.handleClick} name={9} operation="digit"/>
                    <Button clickHandler={this.handleClick} name="&#10005;" operation="divide"/>
                </div>
                <div className="flex-row flex-jsb">
                    <Button clickHandler={this.handleClick} name="+/-" operation="sign_change"/>
                    <Button clickHandler={this.handleClick} name={4} operation="digit"/>
                    <Button clickHandler={this.handleClick} name={5} operation="digit"/>
                    <Button clickHandler={this.handleClick} name={6} operation="digit"/>
                    <Button clickHandler={this.handleClick} name="&minus;" operation="substract"/>
                </div>
                <div className="flex-row flex-jsb">
                    <div className="flex-column">
                        <div className="flex-row flex-jsb">
                            <Button clickHandler={this.handleClick} name="C" className="red" operation="clear"/>
                            <Button clickHandler={this.handleClick} name={1} operation="digit"/>
                            <Button clickHandler={this.handleClick} name={2} operation="digit"/>
                            <Button clickHandler={this.handleClick} name={3} operation="digit"/>
                        </div>
                        <div className="flex-row flex-jsb">
                            <div className="flex-column flex-ac is-relative">
                                <Button clickHandler={this.handleClick} name="AC" className="red onBtn"   operation="all_clear"/>
                                <span className="is-absolute help-text font-xs">ON</span>
                            </div>
                            <Button clickHandler={this.handleClick} name={0} operation="digit"/>
                            <Button clickHandler={this.handleClick} name="." operation="float"/>
                            <Button clickHandler={this.handleClick} name="=" operation="compute"/>
                        </div>
                    </div>
                    <Button clickHandler={this.handleClick} name="+" className="full-flex tall" operation="addition"/>
                </div>
            </div>
        );
    }
}

ButtonPanel.propTypes = {
    clickHandler: PropTypes.func,
};

export default ButtonPanel;
