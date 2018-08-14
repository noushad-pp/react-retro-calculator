import React, { Component } from "react";
import PropTypes from "prop-types";

class Button extends Component {
    handleClick = () => {
        this.props.clickHandler && this.props.clickHandler(this.props.name, this.props.operation);
    };

    render() {
        const className = [
            "buttonContainer flex-row flex-center",
            this.props.className
        ];

        return (
            <div className={className.join(" ").trim()}>
                <button className="pad-5" onClick={this.handleClick}>{this.props.name}</button>
            </div>
        );
    }
}

Button.propTypes = {
    name: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    operation: PropTypes.string.isRequired,
    className: PropTypes.string,
    clickHandler: PropTypes.func,
};

export default Button;
