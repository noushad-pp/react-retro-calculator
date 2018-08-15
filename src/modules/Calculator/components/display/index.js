import React, { Component } from "react";
import PropTypes from "prop-types";

class Display extends Component {
    render() {
        return (
            <div className="display full-flex flex-row flex-jsb flex-ac pad-5">
                <div className="flex-row flex-ac">{this.props.memory && <span className="font-xs">M</span>}</div>
                <div className="flex-row full-flex flex-jfe flex-ac">
                    {this.props.power &&
                        <div className="flex-row full-flex flex-jfe" >{this.props.value || 0}</div>
                    }
                    {!this.props.power &&
                        <div className = "flex-row full-flex flex-jfe" >&nbsp;</div>
                    }
                </div>
            </div>
        );
    }
}

Display.propTypes = {
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    power: PropTypes.bool,
    memory: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ])
};

export default Display;
