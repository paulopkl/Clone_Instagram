import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import { connect } from 'react-redux';

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    placeholder="Name"
                    style={styles.input}
                    autoFocus={true}
                    autoCompleteType="name" // Type of auto-complete
                    value={this.state.name}
                    onChangeText={text => this.setState({ name: text })}
                    />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    autoFocus={true}
                    autoCompleteType="email"
                    keyboardType="email-address"
                    value={this.state.email}
                    onChangeText={text => this.setState({ email: text })}
                    />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    autoFocus={true}
                    value={this.state.password}
                    autoCompleteType="password"
                    onChangeText={text => this.setState({ password: text })}
                    secureTextEntry={true}
                />
                <TouchableOpacity onPress={() => {}} style={styles.button}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286F4'
    },

    buttonText: {
        fontSize: 20,
        color: '#FFF'
    },

    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#EEE',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        paddingLeft: 15
    }
});


const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({
    // onRegister: () => dispatch(Register())
})

const register = connect(mapStateToProps, mapDispatchToProps);

export default register;