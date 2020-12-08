import React, { Component } from 'react';
import { Alert } from 'react-native';

import Navigator from './MenuNavigator';

import { setMessage } from './store/actions/message';
import { connect } from 'react-redux';

export class App extends Component {

    componentDidUpdate = () => {
        if (this.props.text && this.props.text.toString().trim()) {
            Alert.alert(this.props.title || 'Message', this.props.text);
            this.props.clearMessage();
        }
    }

    render() {
        return <Navigator />;
    }
}

const mapStateToProps = state => ({
    title: state.message.title,
    text: state.message.text
});

const mapDispatchToProps = dispatch => ({
    clearMessage: () => dispatch(setMessage({ title: '', text: '' }))
});

const app = connect(mapStateToProps, mapDispatchToProps)(App);

export default app;