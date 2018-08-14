import React, { Component } from "react";
import PropTypes from "prop-types";

class Display extends Component {
    render() {
        return (
            <div className="display full-flex pad-5">
                <div className="flex-row full-flex flex-jfe">{this.props.value}</div>
            </div>
        );
    }
}

Display.propTypes = {
    value: PropTypes.string,
};

export default Display;
