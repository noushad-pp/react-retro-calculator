import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { Router, Route, Switch } from 'react-router';

import './index.scss';
import * as UTILS from '../data/utils/device_data';
import * as pageActions from '../data/redux/page_details/actions';

import Calculator from "./Calculator";

function mapStateToProps(state) {
    return { page_details: state.page_details };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, pageActions), dispatch)
    };
}

class AppContainer extends Component {
    componentWillMount() {
        const systLang = UTILS.getLang();
        this.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
        if (systLang) {
            this.props.actions.setLang(systLang);
        }
        this.timeout = false;
    }

    componentDidMount() {
        let self = this;
        window.addEventListener("resize", function () {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                self.props.actions.setDeviceData(UTILS.checkDevice.deviceStatus());
            }, 300);
        });
    }

    loadPath = (path) => {
        this.props.history.push(path);
    };

    render() {
        const { page_details } = this.props;
        const is_mobile = (page_details.device_data && (page_details.device_data.mobile || page_details.device_data.screen_width < 768));
        return (
            <div className={classNames("flex-column full-width full-min-height AppContainer", { "mobile": is_mobile })}>
                <Router history={this.props.history}>
                    <Switch>
                        <Route exact path="/" component={Calculator} />
                        <Route path="*" component={Calculator} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

AppContainer.propTypes = {
    page_details: PropTypes.object,
    actions: PropTypes.object,
    history: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(AppContainer);
