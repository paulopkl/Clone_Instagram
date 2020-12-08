import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Gravatar } from 'react-native-gravatar';
import { connect } from 'react-redux';
import { logout } from '../store/actions/user';

class Profile extends Component {

    constructor(props) {
        super(props);
    }

    logout = () => {
        this.props.onLogout();
        this.props.navigation.navigate('Auth');
    }

    render() {
        const options = { email: this.props.email, secure: true };
        return (
            <View style={styles.container}>
                <Gravatar options={options} style={styles.avatar} />
                <Text style={styles.nickname}>{this.props.name}</Text>
                <Text style={styles.email}>{this.props.email}</Text>
                <TouchableOpacity onPress={this.logout} style={styles.button}>
                    <Text style={styles.buttonText}>Exit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },

    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginTop: 100
    },

    nickname: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
    },

    email: {
        marginTop: 20,
        fontSize: 25,
    },

    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4'
    },

    buttonText: {
        fontSize: 20,
        color: '#FFF'
    }
});


const mapStateToProps = state => ({ name: state.user.name, email: state.user.email });
const mapDispatchToProps = dispatch => ({ onLogout: () => dispatch(logout()) });

const profile = connect(mapStateToProps, mapDispatchToProps)(Profile);

export default profile;