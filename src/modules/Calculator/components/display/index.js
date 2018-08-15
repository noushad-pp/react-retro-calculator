import React, { Component } from "react";
import PropTypes from "prop-types";

class Display extends Component {
    render() {
        return (
            <div className="display full-flex flex-row flex-ac pad-5">
                {this.props.power &&
                    <div className="flex-row full-flex flex-jfe flex-ac">{this.props.value || 0}</div>
                }
                {!this.props.power&&
                    <div className="flex-row full-flex flex-jfe">&nbsp;</div>
                }
            </div>
        );
    }
}

Display.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    power: PropTypes.bool
};

export default Display;
