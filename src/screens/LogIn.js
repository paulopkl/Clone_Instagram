import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';

import { login } from '../store/actions/user';

class LogIn extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            name: 'Temp',
            email: '', 
            password: '' 
        }
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Profile');
        }
    }

    login = () => { this.props.onLogin(this.state); }

    navigateToRegister = () => { this.props.navigation.navigate('Register'); }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder="Email" 
                    style={styles.input}
                    autoFocus={true}
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                />
                <TextInput 
                    placeholder="Password" 
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={text => this.setState({ password: text })} 
                />
                <TouchableOpacity onPress={this.login} style={styles.button}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.navigateToRegister} style={styles.button}>
                    <Text style={styles.buttonText}>Create new Account...</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333'
    },

    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286F4'
    },

    buttonText: {
        fontSize: 20,
        color: '#FFF',
    }
});

const mapStateToProps = state => ({ isLoading: state.user.isLoading });

const mapDispatchToProps = dispatch => ({ onLogin: user => dispatch(login(user)) });

const logIn = connect(mapStateToProps, mapDispatchToProps)(LogIn);

export default logIn;