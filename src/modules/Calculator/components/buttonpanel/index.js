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
                    <span className="font-sm full-flex lr-pad-15">SL-3005V</span>
                    <div className="flex-row flex-jse">
                        <Button onClick={this.handleClick} name="&radic;" operation="square_root" className="small"/>
                        <Button onClick={this.handleClick} name="OFF" operation="power_off" className="small"/>
                    </div>
                </div>
                <div className="flex-row flex-jsb">
                    <Button onClick={this.handleClick} name="MC" operation="mem_clear"/>
                    <Button onClick={this.handleClick} name="MR" operation="mem_record"/>
                    <Button onClick={this.handleClick} name="M+" operation="mem_add"/>
                    <Button onClick={this.handleClick} name="M-" operation="mem_substract"/>
                    <Button onClick={this.handleClick} name="&divide;" operation=""/>
                </div>
                <div className="flex-row flex-jsb">
                    <Button onClick={this.handleClick} name="%" operation="modulus"/>
                    <Button onClick={this.handleClick} name={7} operation="digit"/>
                    <Button onClick={this.handleClick} name={8} operation="digit"/>
                    <Button onClick={this.handleClick} name={9} operation="digit"/>
                    <Button onClick={this.handleClick} name="&#10005;" operation="divide"/>
                </div>
                <div className="flex-row flex-jsb">
                    <Button onClick={this.handleClick} name="+/-" operation="sign_change"/>
                    <Button onClick={this.handleClick} name={4} operation="digit"/>
                    <Button onClick={this.handleClick} name={5} operation="digit"/>
                    <Button onClick={this.handleClick} name={6} operation="digit"/>
                    <Button onClick={this.handleClick} name="&minus;" operation="substract"/>
                </div>
                <div className="flex-row flex-jsb">
                    <div className="flex-column">
                        <div className="flex-row flex-jsb">
                            <Button onClick={this.handleClick} name="C" className="red" operation="clear"/>
                            <Button onClick={this.handleClick} name={1} operation="digit"/>
                            <Button onClick={this.handleClick} name={2} operation="digit"/>
                            <Button onClick={this.handleClick} name={3} operation="digit"/>
                        </div>
                        <div className="flex-row flex-jsb">
                            <Button onClick={this.handleClick} name="AC" className="red" operation="all_clear"/>
                            <Button onClick={this.handleClick} name={0} operation="digit"/>
                            <Button onClick={this.handleClick} name="." operation="float"/>
                            <Button onClick={this.handleClick} name="=" operation="compute"/>
                        </div>
                    </div>
                    <Button onClick={this.handleClick} name="+" className="full-flex tall" operation="addition"/>
                </div>
            </div>
        );
    }
}

ButtonPanel.propTypes = {
  clickHandler: PropTypes.func,
};

export default ButtonPanel;
