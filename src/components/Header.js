import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, Image } from 'react-native';

import { Gravatar } from 'react-native-gravatar';
import { connect } from 'react-redux';

import icon from '../../assets/imgs/icon.png';

class Header extends Component {

    render() {
        const name = this.props.name || 'Anonymous';
        const gravatar = this.props.email 
            ? <Gravatar options={{ email: this.props.email, secure: true }} style={styles.avatar} /> 
            : null;
        return (
            <View style={styles.container}>
                <View style={styles.rowContainer}>
                    <Image source={icon} style={styles.image} />
                    <Text style={styles.title}>Lambe Lambe</Text>
                </View>
                <View style={styles.userContainer}>
                    <Text style={styles.user}>{name}</Text>
                    {gravatar}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: Platform.OS === 'ios' ? 20 : 0,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#BBB',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    
    image: {
        height: 30,
        width: 30,
        resizeMode: 'contain'
    },

    title: {
        color: '#000',
        fontFamily: 'shelter', // The name of Font
        height: 30,
        fontSize: 28
    },

    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    user: {
        fontSize: 10,
        color: '#888',
    },

    avatar: {
        width: 30,
        height: 30,
        marginLeft: 10,
    }
});

const mapStateToProps = state => ({ name: state.user.name, email: state.user.email });

const header = connect(mapStateToProps)(Header);

export default header;